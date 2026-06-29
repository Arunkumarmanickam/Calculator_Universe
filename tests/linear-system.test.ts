import { describe, it, expect } from 'vitest'
import { parseEquation, detectVariables, solveLinearSystem } from '../src/lib/linear-system'

describe('parseEquation', () => {
  it('parses simple equation', () => {
    const result = parseEquation('a + b = 10')
    expect(result.coefficients).toEqual({ a: 1, b: 1 })
    expect(result.constant).toBe(10)
  })

  it('parses equation with negative coefficients', () => {
    const result = parseEquation('2x - 3y = 5')
    expect(result.coefficients).toEqual({ x: 2, y: -3 })
    expect(result.constant).toBe(5)
  })

  it('handles constant on left side', () => {
    const result = parseEquation('2x + 5 = 15')
    expect(result.coefficients).toEqual({ x: 2 })
    expect(result.constant).toBe(15 - 5)
  })

  it('handles single variable', () => {
    const result = parseEquation('x = 5')
    expect(result.coefficients).toEqual({ x: 1 })
    expect(result.constant).toBe(5)
  })
})

describe('detectVariables', () => {
  it('detects variables from equations', () => {
    const vars = detectVariables(['a + b = 10', 'b + c = 20', 'a + c = 30'])
    expect(vars).toEqual(['a', 'b', 'c'])
  })
})

describe('solveLinearSystem', () => {
  it('solves 2-variable system', () => {
    const result = solveLinearSystem(['x + y = 10', 'x - y = 2'])
    expect(result).not.toBeNull()
    expect(result!.x).toBeCloseTo(6, 5)
    expect(result!.y).toBeCloseTo(4, 5)
  })

  it('solves 3-variable system', () => {
    const result = solveLinearSystem([
      'a + b + c = 6',
      '2a - b + c = 3',
      'a + 2b - c = 2',
    ])
    expect(result).not.toBeNull()
    expect(result!.a).toBeCloseTo(1, 4)
    expect(result!.b).toBeCloseTo(2, 4)
    expect(result!.c).toBeCloseTo(3, 4)
  })

  it('solves the users example', () => {
    const result = solveLinearSystem([
      'a + b = 10',
      'b + c = 20',
      'a + c = 30',
    ])
    expect(result).not.toBeNull()
    expect(result!.a).toBeCloseTo(10, 4)
    expect(result!.b).toBeCloseTo(0, 4)
    expect(result!.c).toBeCloseTo(20, 4)
  })

  it('returns null for underdetermined system', () => {
    const result = solveLinearSystem(['x + y = 10'])
    expect(result).toBeNull()
  })
})
