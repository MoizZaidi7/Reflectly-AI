// Color Palette
export const colors = {
  // Primary Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },

  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },

  // Accent Colors
  accent: {
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87'
    },
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81'
    }
  },

  // Emotion Colors
  emotions: {
    happy: {
      bg: '#fefce8',
      border: '#fde047',
      text: '#a16207',
      icon: '#eab308'
    },
    sad: {
      bg: '#eff6ff',
      border: '#60a5fa',
      text: '#1e40af',
      icon: '#3b82f6'
    },
    anxious: {
      bg: '#faf5ff',
      border: '#c084fc',
      text: '#7c3aed',
      icon: '#a855f7'
    },
    angry: {
      bg: '#fef2f2',
      border: '#f87171',
      text: '#dc2626',
      icon: '#ef4444'
    },
    excited: {
      bg: '#fff7ed',
      border: '#fb923c',
      text: '#ea580c',
      icon: '#f97316'
    },
    grateful: {
      bg: '#f0fdf4',
      border: '#4ade80',
      text: '#16a34a',
      icon: '#22c55e'
    },
    neutral: {
      bg: '#f8fafc',
      border: '#94a3b8',
      text: '#475569',
      icon: '#64748b'
    }
  },

  // Status Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  },

  // Neutral Grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712'
  }
};

// Typography
export const typography = {
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    serif: ['ui-serif', 'Georgia', 'Cambria', 'serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace']
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }]
  },

  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  }
};

// Spacing
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem'
};

// Border Radius
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px'
};

// Shadows
export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000'
};

// Gradients
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  warning: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  error: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  info: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  
  // Journal specific gradients
  journal: {
    header: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    card: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    emotion: {
      happy: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
      sad: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      anxious: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
      angry: 'linear-gradient(135deg, #ff7675 0%, #d63031 100%)',
      excited: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
      grateful: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
      neutral: 'linear-gradient(135deg, #ddd 0%, #b2bec3 100%)'
    }
  }
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Animations
export const animations = {
  transition: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  },
  
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' }
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' }
    },
    slideDown: {
      '0%': { transform: 'translateY(-20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' }
    },
    scaleIn: {
      '0%': { transform: 'scale(0.9)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' }
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' }
    },
    spin: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  }
};

// Component Variants
export const components = {
  button: {
    primary: {
      background: gradients.primary,
      color: colors.primary[50],
      border: 'none',
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.base[0],
      fontWeight: typography.fontWeight.medium,
      boxShadow: boxShadow.md,
      transition: animations.transition.normal
    },
    secondary: {
      background: colors.gray[100],
      color: colors.gray[700],
      border: `1px solid ${colors.gray[300]}`,
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.base[0],
      fontWeight: typography.fontWeight.medium,
      boxShadow: boxShadow.sm,
      transition: animations.transition.normal
    },
    ghost: {
      background: 'transparent',
      color: colors.gray[600],
      border: 'none',
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.base[0],
      fontWeight: typography.fontWeight.medium,
      transition: animations.transition.normal
    }
  },

  card: {
    default: {
      background: colors.gray[50],
      border: `1px solid ${colors.gray[200]}`,
      borderRadius: borderRadius['2xl'],
      padding: spacing[6],
      boxShadow: boxShadow.lg,
      transition: animations.transition.normal
    },
    elevated: {
      background: colors.gray[50],
      border: `1px solid ${colors.gray[200]}`,
      borderRadius: borderRadius['3xl'],
      padding: spacing[8],
      boxShadow: boxShadow.xl,
      transition: animations.transition.normal
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      border: `1px solid rgba(255, 255, 255, 0.3)`,
      borderRadius: borderRadius['2xl'],
      padding: spacing[6],
      boxShadow: boxShadow.lg,
      transition: animations.transition.normal
    }
  },

  input: {
    default: {
      background: colors.gray[50],
      border: `1px solid ${colors.gray[300]}`,
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.base[0],
      color: colors.gray[900],
      transition: animations.transition.fast,
      focus: {
        outline: 'none',
        borderColor: colors.primary[500],
        boxShadow: `0 0 0 3px rgba(59, 130, 246, 0.1)`
      }
    }
  }
};

// Dark Theme
export const darkTheme = {
  colors: {
    ...colors,
    background: {
      primary: colors.gray[900],
      secondary: colors.gray[800],
      tertiary: colors.gray[700]
    },
    text: {
      primary: colors.gray[50],
      secondary: colors.gray[300],
      tertiary: colors.gray[400]
    }
  },
  
  components: {
    ...components,
    card: {
      ...components.card,
      default: {
        ...components.card.default,
        background: colors.gray[800],
        border: `1px solid ${colors.gray[700]}`,
        color: colors.gray[50]
      },
      glass: {
        ...components.card.glass,
        background: 'rgba(17, 24, 39, 0.8)',
        border: `1px solid rgba(75, 85, 99, 0.3)`
      }
    },
    input: {
      ...components.input,
      default: {
        ...components.input.default,
        background: colors.gray[800],
        border: `1px solid ${colors.gray[600]}`,
        color: colors.gray[50]
      }
    }
  }
};

// Theme Context Helper
export const createTheme = (isDark = false) => {
  const baseTheme = {
    colors,
    typography,
    spacing,
    borderRadius,
    boxShadow,
    gradients,
    breakpoints,
    animations,
    components
  };

  return isDark ? { ...baseTheme, ...darkTheme } : baseTheme;
};

// Utility Functions
export const getEmotionColor = (emotion) => {
  return colors.emotions[emotion] || colors.emotions.neutral;
};

export const getGradientByEmotion = (emotion) => {
  return gradients.journal.emotion[emotion] || gradients.journal.emotion.neutral;
};

export const rgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  gradients,
  breakpoints,
  animations,
  components,
  darkTheme,
  createTheme,
  getEmotionColor,
  getGradientByEmotion,
  rgba
};