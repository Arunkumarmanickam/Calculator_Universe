import { describe, it, expect } from 'vitest'
import emiCalc from '../calculators/finance/emi'
import sipCalc from '../calculators/finance/sip'
import bmiCalc from '../calculators/health/bmi'
import ageCalc from '../calculators/datetime/age'

describe('EMI Calculator', () => {
  it('calculates EMI correctly for standard inputs', () => {
    const result = emiCalc.calculate({ principal: 100000, rate: 8.5, tenure: 5 })
    expect(result.emi).toBeGreaterThan(0)
    expect(result.totalPayment).toBeGreaterThan(100000)
    expect(result.totalInterest).toBeGreaterThan(0)
  })

  it('returns zero for invalid inputs', () => {
    const result = emiCalc.calculate({ principal: 0, rate: 8.5, tenure: 5 })
    expect(result.emi).toBe(0)
  })

  it('formats output with INR currency', () => {
    const result = emiCalc.calculate({ principal: 100000, rate: 8.5, tenure: 5 })
    const formatted = emiCalc.format!(result)
    expect(formatted['Monthly EMI']).toContain('\u20B9')
  })
})

describe('SIP Calculator', () => {
  it('calculates future value correctly', () => {
    const result = sipCalc.calculate({ monthly: 5000, rate: 12, years: 10 })
    expect(result.totalInvestment).toBe(5000 * 12 * 10)
    expect(result.totalValue).toBeGreaterThan(result.totalInvestment)
  })
})

describe('BMI Calculator', () => {
  it('calculates BMI correctly', () => {
    const result = bmiCalc.calculate({ weight: 70, height: 175 })
    expect(result.bmi).toBeCloseTo(22.9, 1)
    expect(result.category).toBe('Normal')
  })

  it('classifies underweight correctly', () => {
    const result = bmiCalc.calculate({ weight: 50, height: 180 })
    expect(result.category).toBe('Underweight')
  })
})

describe('Age Calculator', () => {
  it('calculates age correctly for known birth dates', () => {
    const result = ageCalc.calculate({ birthYear: 2000, birthMonth: 1, birthDay: 1 })
    expect(result.years).toBeGreaterThanOrEqual(26)
    expect(result.totalDays).toBeGreaterThan(0)
  })
})
