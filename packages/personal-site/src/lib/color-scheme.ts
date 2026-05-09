import type { ColorScheme } from '../types'

const COLOR_SCHEMES = new Set<string>(['dark', 'light', 'system'])

export const isColorScheme = (value: unknown): value is ColorScheme =>
  typeof value === 'string' && COLOR_SCHEMES.has(value)
