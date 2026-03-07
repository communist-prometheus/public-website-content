export const IMAGE_PRESETS = {
  thumbnail: {
    widths: [400, 600],
    sizes: '(max-width: 640px) 100vw, 400px',
  },
  featured: {
    widths: [640, 1000, 1500],
    sizes: '(max-width: 640px) 100vw, 1000px',
  },
  content: {
    widths: [640, 800, 1200],
    sizes: '(max-width: 640px) 100vw, 800px',
  },
} as const;

export type ImagePreset = keyof typeof IMAGE_PRESETS;
