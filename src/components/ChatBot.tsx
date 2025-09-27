import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

interface Message {
  text: string
  isBot: boolean
}

interface ChatBotProps {
  onClose: () => void
}

const MotionBox = motion(Box)

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi! I\'m Maitri, your cosmic companion. How can I guide you today? ✨', isBot: true }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { text: userMessage, isBot: false }])
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:8000/chat/message', {
        user_id: '123', // This would come from your auth system
        message: userMessage
      })

      setMessages(prev => [...prev, { text: response.data.message, isBot: true }])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', isBot: true }])
    }

    setLoading(false)
  }

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        position="fixed"
        bottom={4}
        right={4}
        width={['calc(100% - 2rem)', '420px']}
        maxH="600px"
        bg="glass.white"
        backdropFilter="blur(20px)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="glass.border"
        boxShadow="cosmic"
        overflow="hidden"
        zIndex={9999}
      >
        {/* Header */}
        <HStack
          bg="linear-gradient(135deg, #FF9F4A 0%, #F39C12 100%)"
          p={4}
          justify="space-between"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
            backgroundSize="200% 100%"
            animation="shimmer 3s infinite"
          />
          <HStack gap={3} position="relative">
            <Box
              p={2}
              borderRadius="lg"
              bg="whiteAlpha.200"
              animation="pulse 2s infinite"
            >
              <Icon as={FaRobot} color="white" boxSize={5} />
            </Box>
            <VStack align="start" gap={0}>
              <HStack gap={2}>
                <Text color="white" fontWeight="bold" fontFamily="fonts.heading">
                  Maitri
                </Text>
                <Icon as={HiSparkles} color="white" boxSize={4} />
              </HStack>
              <Text color="whiteAlpha.800" fontSize="xs">
                Your Cosmic Companion
              </Text>
            </VStack>
          </HStack>
          <Button
            size="sm"
            variant="ghost"
            color="white"
            onClick={onClose}
            _hover={{ bg: 'whiteAlpha.200' }}
            borderRadius="lg"
          >
            <Icon as={FaTimes} />
          </Button>
        </HStack>

        {/* Messages */}
        <VStack
          height="400px"
          overflowY="auto"
          p={4}
          gap={4}
          align="stretch"
          bg="space.dark"
          position="relative"
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
            },
          }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                alignSelf={message.isBot ? 'flex-start' : 'flex-end'}
                maxW="80%"
              >
                <Box
                  bg={message.isBot 
                    ? 'glass.white' 
                    : 'linear-gradient(135deg, #FF9F4A 0%, #F39C12 100%)'
                  }
                  color="white"
                  py={3}
                  px={4}
                  borderRadius={message.isBot ? "lg lg lg 4" : "lg lg 4 lg"}
                  border={message.isBot ? "1px solid" : "none"}
                  borderColor="glass.border"
                  backdropFilter={message.isBot ? "blur(10px)" : "none"}
                  boxShadow={message.isBot ? "none" : "nebula"}
                  position="relative"
                >
                  {message.isBot && (
                    <Icon 
                      as={HiSparkles} 
                      position="absolute" 
                      top={-1} 
                      right={-1} 
                      color="brand.stardust" 
                      boxSize={3}
                    />
                  )}
                  <Text fontSize="sm">{message.text}</Text>
                </Box>
              </MotionBox>
            ))}
          </AnimatePresence>
          
          {loading && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              alignSelf="flex-start"
              bg="glass.white"
              py={3}
              px={4}
              borderRadius="lg"
              border="1px solid"
              borderColor="glass.border"
              backdropFilter="blur(10px)"
            >
              <HStack gap={1}>
                <Box 
                  w={2} 
                  h={2} 
                  bg="brand.cosmic" 
                  borderRadius="full" 
                  animation="pulse 1s infinite"
                />
                <Box 
                  w={2} 
                  h={2} 
                  bg="brand.aurora" 
                  borderRadius="full" 
                  animation="pulse 1s infinite 0.2s"
                />
                <Box 
                  w={2} 
                  h={2} 
                  bg="brand.stardust" 
                  borderRadius="full" 
                  animation="pulse 1s infinite 0.4s"
                />
              </HStack>
            </MotionBox>
          )}
          <div ref={messagesEndRef} />
        </VStack>

        {/* Input */}
        <Box 
          p={4} 
          bg="glass.light"
          borderTop="1px solid"
          borderColor="glass.border"
        >
          <HStack gap={2}>
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="glass.border"
              color="white"
              _placeholder={{ color: 'whiteAlpha.500' }}
              _hover={{ borderColor: 'whiteAlpha.400' }}
              _focus={{ 
                borderColor: 'brand.orange',
                boxShadow: '0 0 0 1px var(--colors-brand-orange)'
              }}
              flex={1}
            />
            <Button
              size="sm"
              bg="linear-gradient(135deg, #FF9F4A 0%, #F39C12 100%)"
              color="white"
              onClick={handleSend}
              loading={loading}
              disabled={!input.trim() || loading}
              _hover={{ 
                transform: 'scale(1.05)',
                boxShadow: 'nebula' 
              }}
              _active={{ transform: 'scale(0.95)' }}
              borderRadius="lg"
              h="40px"
              w="40px"
            >
              <Icon as={FaPaperPlane} />
            </Button>
                    </HStack>
        </Box>
      </MotionBox>
    </AnimatePresence>
  )
}

export default ChatBot