import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          orange: { value: '#FF9F4A' },
          purple: { value: '#2D1B69' },
          white: { value: '#FFFFFF' },
        },
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
        },
      },
    },
  },
})

export const theme = createSystem(defaultConfig, config)

export default theme