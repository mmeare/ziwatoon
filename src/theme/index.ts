// ─── Ziwatoon Design Tokens ──────────────────────────────────────────────────

export const Colors = {
  black:       '#000000',
  cyan:        '#36ADA3',
  darkBlue:    '#121358',
  white:       '#FFFFFF',
  cardBg:      '#111111',
  cardBorder:  '#222222',
  surface:     '#0d0d1a',
  overlay:     'rgba(0,0,0,0.75)',
} as const;

/** LinearGradient color arrays (for expo-linear-gradient) */
export const Gradients = {
  /** Top region header background */
  topRegion:   ['#000000', '#121358', '#36ADA3'] as string[],
  /** Nav item / sub-nav underlay */
  navItem:     ['#000000', '#36ADA3', '#000000'] as string[],
  /** Section title boxes */
  titleBox:    ['#36ADA3', '#000000', '#36ADA3'] as string[],
  /** Auth button */
  authBtn:     ['#000000', '#36ADA3', '#000000'] as string[],
  /** Right sidebar frame bg */
  sidebarBg:   ['rgba(18,19,88,0.22)', '#000000'] as string[],
  /** Discord widget */
  discordBg:   ['#0d0d1a', '#121358', '#0d0d1a'] as string[],
  /** Card overlay (bottom label) */
  cardLabel:   ['transparent', 'rgba(0,0,0,0.85)'] as string[],
} as const;

export const Shadows = {
  neonCyan: {
    shadowColor:   '#36ADA3',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius:  10,
    elevation:     8,
  },
  neonBlue: {
    shadowColor:   '#121358',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius:  12,
    elevation:     6,
  },
  card: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius:  6,
    elevation:     4,
  },
} as const;

export const Typography = {
  brand:   { fontSize: 18, fontWeight: '800' as const, letterSpacing: 2, fontStyle: 'italic' as const },
  heading: { fontSize: 14, fontWeight: '800' as const, letterSpacing: 1 },
  nav:     { fontSize: 12, fontWeight: '700' as const },
  subNav:  { fontSize: 11, fontWeight: '600' as const },
  label:   { fontSize: 10, fontWeight: '700' as const },
  body:    { fontSize: 13, fontWeight: '600' as const, lineHeight: 20 },
  badge:   { fontSize: 8,  fontWeight: '800' as const, letterSpacing: 0.5 },
} as const;

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
  xxl: 32,
} as const;

export const Radius = {
  sm:   4,
  md:   8,
  lg:   12,
  pill: 20,
  full: 999,
} as const;
