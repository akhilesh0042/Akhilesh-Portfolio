/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#101014",
        elevation1: "#1B1B22",
        elevation2: "#232330",
        'amber-accent': "#D9A05B",
        accent: "#D9A05B",
        'amber-hover': "#E8B26F",
        'amber-dim': "rgba(217, 160, 91, 0.15)",
        'amber-rim': "rgba(217, 160, 91, 0.08)",
        textPrimary: "#EDEDF2",
        textMuted: "#7A7A8C",
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'elevation-menu': '0 12px 32px -8px rgba(0, 0, 0, 0.65), 0 20px 45px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 1px 0 rgba(217, 160, 91, 0.10)',
        'elevation-menu-scrolled': '0 18px 48px -10px rgba(0, 0, 0, 0.85), 0 32px 64px -16px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 1px 0 rgba(217, 160, 91, 0.16)',
        'elevation-card-a': '0 14px 30px -8px rgba(0, 0, 0, 0.62), 0 4px 14px -2px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 1px 0 rgba(217, 160, 91, 0.08)',
        'elevation-card-b': '2px 16px 36px -10px rgba(0, 0, 0, 0.65), 3px 6px 18px -2px rgba(0, 0, 0, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 1px 0 rgba(217, 160, 91, 0.08)',
        'elevation-card-c': '-2px 16px 36px -10px rgba(0, 0, 0, 0.65), -3px 6px 18px -2px rgba(0, 0, 0, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 1px 0 rgba(217, 160, 91, 0.08)',
        'elevation-hover': '0 24px 50px -12px rgba(0, 0, 0, 0.8), 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 1px 0 rgba(217, 160, 91, 0.14)',
        'elevation-chip': '0 4px 14px -2px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 1px 0 rgba(217, 160, 91, 0.05)',
        'elevation-chip-hover': '0 6px 18px -3px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 1px 0 rgba(217, 160, 91, 0.12)',
        'status-pill': '0 6px 16px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 1px 0 rgba(217, 160, 91, 0.07)',
      },
    },
  },
  plugins: [],
}
