import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          orange: { value: '#FF9F4A' },
          purple: { value: '#2D1B69' },
          darkPurple: { value: '#1A0F3A' },
          lightPurple: { value: '#4A3785' },
          cosmic: { value: '#9B59B6' },
          nebula: { value: '#E74C3C' },
          stardust: { value: '#F39C12' },
          aurora: { value: '#3498DB' },
          white: { value: '#FFFFFF' },
        },
        space: {
          dark: { value: '#0A0A0F' },
          deep: { value: '#13131A' },
          medium: { value: '#1C1C28' },
          light: { value: '#2A2A3E' },
        },
        glass: {
          white: { value: 'rgba(255, 255, 255, 0.1)' },
          light: { value: 'rgba(255, 255, 255, 0.05)' },
          border: { value: 'rgba(255, 255, 255, 0.2)' },
        },
      },
      fonts: {
        heading: { value: "'Orbitron', 'Inter', system-ui, sans-serif" },
        body: { value: "'Inter', system-ui, -apple-system, sans-serif" },
      },
      shadows: {
        cosmic: { value: '0 4px 20px rgba(155, 89, 182, 0.3), 0 8px 40px rgba(155, 89, 182, 0.1)' },
        aurora: { value: '0 0 40px rgba(52, 152, 219, 0.4), 0 0 80px rgba(52, 152, 219, 0.2)' },
        nebula: { value: '0 0 60px rgba(231, 76, 60, 0.3), 0 0 120px rgba(231, 76, 60, 0.1)' },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: '{colors.brand.purple}' },
        text: { value: '{colors.brand.white}' },
      },
    },
    recipes: {
      button: {
        base: {
          borderRadius: 'full',
          transition: 'all 0.3s ease',
          fontFamily: '{fonts.heading}',
        },
      },
    },
  },
})

export const theme = createSystem(defaultConfig, config)

export default theme