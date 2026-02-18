export const AnimationPresets = {
  RESULT_APPEAR: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3 },
  },

  COIN_SPIN: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
    transition: { duration: 0.2 },
  },

  COIN_IDLE: {
    initial: { opacity: 0, scale: 0.75, rotateX: 40 },
    animate: { opacity: 1, scale: 1, rotateX: 0 },
    exit: { opacity: 0, scale: 0.5, rotateX: -30 },
    transition: {
      duration: 0.35,
      type: 'spring',
      damping: 16,
      stiffness: 180,
    },
  },
} as const;

export const SPIN_DURATION = 1800;
export const RESULT_DISPLAY = 2200;
