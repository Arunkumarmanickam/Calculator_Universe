export interface ParsedEquation {
  coefficients: Record<string, number>
  constant: number
}

function tokenize(side: string): string[] {
  const tokens: string[] = []
  let current = ''
  for (const ch of side) {
    if (ch === ' ') continue
    if ((ch === '+' || ch === '-') && current) {
      tokens.push(current)
      current = ch === '+' ? '' : '-'
    } else if (ch === '+' || ch === '-') {
      current = ch === '+' ? '' : '-'
    } else {
      current += ch
    }
  }
  if (current) tokens.push(current)
  return tokens
}

export function parseEquation(eq: string): ParsedEquation {
  const [left, right] = eq.split('=').map((s) => s.trim())
  if (!left || right === undefined) throw new Error(`Invalid equation: "${eq}"`)

  const coefficients: Record<string, number> = {}
  let constant = parseFloat(right) || 0

  const leftTokens = tokenize(left)
  for (const token of leftTokens) {
    const varMatch = token.match(/^(-?\d*\.?\d*)?([a-zA-Z])$/)
    if (varMatch) {
      const varName = varMatch[2]
      const numPart = varMatch[1]
      const coeff = !numPart || numPart === '-' ? (numPart === '-' ? -1 : 1) : parseFloat(numPart)
      coefficients[varName] = (coefficients[varName] || 0) + coeff
    } else {
      const num = parseFloat(token)
      if (!isNaN(num)) {
        constant -= num
      }
    }
  }

  return { coefficients, constant }
}

export function detectVariables(equations: string[]): string[] {
  const vars = new Set<string>()
  for (const eq of equations) {
    for (const ch of eq) {
      if (/[a-zA-Z]/.test(ch)) vars.add(ch)
    }
  }
  return Array.from(vars).sort()
}

export function solveLinearSystem(equations: string[]): Record<string, number> | null {
  const vars = detectVariables(equations)
  const n = vars.length
  if (n === 0) return null
  if (equations.length < n) return null

  const varIndex: Record<string, number> = {}
  vars.forEach((v, i) => { varIndex[v] = i })

  const matrix: number[][] = []
  const constants: number[] = []

  for (const eq of equations) {
    const parsed = parseEquation(eq)
    const row = new Array(n).fill(0)
    for (const [v, coeff] of Object.entries(parsed.coefficients)) {
      const idx = varIndex[v]
      if (idx !== undefined) row[idx] = coeff
    }
    matrix.push(row)
    constants.push(parsed.constant)
  }

  const x = gaussianElimination(matrix, constants, n)
  if (!x) return null

  const output: Record<string, number> = {}
  vars.forEach((v, i) => {
    output[v] = parseFloat(x[i].toFixed(6))
  })
  return output
}

function gaussianElimination(A: number[][], b: number[], n: number): number[] | null {
  const aug = A.map((row, i) => [...row, b[i]])

  for (let col = 0; col < n; col++) {
    let maxRow = col
    for (let row = col + 1; row < aug.length; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row
    }
    if (Math.abs(aug[maxRow][col]) < 1e-10) return null
    ;[aug[col], aug[maxRow]] = [aug[maxRow], aug[col]]

    for (let row = col + 1; row < aug.length; row++) {
      const factor = aug[row][col] / aug[col][col]
      for (let j = col; j <= n; j++) {
        aug[row][j] -= factor * aug[col][j]
      }
    }
  }

  const x = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(aug[i][i]) < 1e-10) return null
    let sum = aug[i][n]
    for (let j = i + 1; j < n; j++) {
      sum -= aug[i][j] * x[j]
    }
    x[i] = sum / aug[i][i]
  }

  return x
}
