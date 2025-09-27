import { Box, ChakraProvider, Container, VStack } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import theme from './theme'
import Calendar from './components/Calendar'
import Features from './components/Features'
import ChatBot from './components/ChatBot'
import { useState } from 'react'

const GlobalStyles = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100vh;
    background: #2D1B69;
  }
`

function App() {
  const [showChat, setShowChat] = useState(false)

  return (
    <ChakraProvider value={theme}>
      <Global styles={GlobalStyles} />
      <Box minH="100vh" bg="brand.purple" position="relative">
        <Container maxW="container.sm" py={8}>
          <VStack gap={8}>
            <Calendar />
            <Features onChatClick={() => setShowChat(true)} />
          </VStack>
        </Container>
        {showChat && <ChatBot onClose={() => setShowChat(false)} />}
      </Box>
    </ChakraProvider>
  )
}

export default App