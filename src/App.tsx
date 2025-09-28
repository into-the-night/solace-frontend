import { Box, ChakraProvider, Container, VStack, Heading, Text } from '@chakra-ui/react'
import { Global, css, keyframes } from '@emotion/react'
import theme from './theme'
import Calendar from './components/Calendar'
import Features from './components/Features'
import ChatBot from './components/ChatBot'
import { useState } from 'react'

const starAnimation = keyframes`
  from { transform: translateY(0px); }
  to { transform: translateY(-2000px); }
`

const GlobalStyles = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100vh;
    background: linear-gradient(180deg, #0A0A0F 0%, #1A0F3A 50%, #2D1B69 100%);
  }
`

const Stars = () => (
  <Box
    position="fixed"
    top={0}
    left={0}
    width="100%"
    height="100%"
    overflow="hidden"
    pointerEvents="none"
    zIndex={0}
  >
    {[...Array(200)].map((_, i) => (
      <Box
        key={i}
        position="absolute"
        width={`${Math.random() * 3}px`}
        height={`${Math.random() * 3}px`}
        backgroundColor="white"
        borderRadius="50%"
        top={`${Math.random() * 200}%`}
        left={`${Math.random() * 100}%`}
        animation={`${starAnimation} ${15 + Math.random() * 30}s linear infinite`}
        opacity={Math.random()}
      />
    ))}
  </Box>
)

const CosmicOrb = () => (
  <Box
    position="fixed"
    width="600px"
    height="600px"
    borderRadius="50%"
    top="-300px"
    right="-200px"
    background="radial-gradient(circle, rgba(155, 89, 182, 0.3) 0%, rgba(52, 152, 219, 0.2) 40%, transparent 70%)"
    filter="blur(60px)"
    pointerEvents="none"
    zIndex={0}
  />
)

function App() {
  const [showChat, setShowChat] = useState(false)

  return (
    <ChakraProvider value={theme}>
      <Global styles={GlobalStyles} />
      <Box minH="100vh" position="relative" overflow="hidden">
        <Stars />
        <CosmicOrb />
        
        <Container maxW="container.sm" py={8} position="relative" zIndex={1}>
          <VStack gap={8}>
            <Box textAlign="center" mb={4}>
              <Heading
                size="3xl"
                fontFamily="fonts.heading"
                background="linear-gradient(135deg, #FFFFFF 0%, #9B59B6 50%, #3498DB 100%)"
                backgroundClip="text"
                color="transparent"
                letterSpacing="wider"
                textTransform="uppercase"
                mb={2}
              >
                Solace
              </Heading>
                <Text
                  fontSize="lg"
                  color="whiteAlpha.800"
                  fontWeight="300"
                  letterSpacing="wide"
                >
                Your cosmic journey to inner peace
              </Text>
            </Box>
            
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