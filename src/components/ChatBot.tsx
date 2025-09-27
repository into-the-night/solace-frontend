import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaRobot, FaTimes } from 'react-icons/fa'
import axios from 'axios'

interface Message {
  text: string
  isBot: boolean
}

interface ChatBotProps {
  onClose: () => void
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi! I\'m Maitri. How can I help you today?', isBot: true }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

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
    <Box
      position="fixed"
      bottom={4}
      right={4}
      width={['full', '400px']}
      bg="white"
      borderRadius="xl"
      boxShadow="xl"
      overflow="hidden"
    >
      {/* Header */}
      <HStack
        bg="brand.orange"
        p={4}
        justify="space-between"
      >
        <HStack>
          <Icon as={FaRobot} color="white" />
          <Text color="white" fontWeight="bold">Chat with Maitri</Text>
        </HStack>
        <Button
          size="sm"
          variant="ghost"
          color="white"
          onClick={onClose}
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
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.isBot ? 'flex-start' : 'flex-end'}
            bg={message.isBot ? 'gray.100' : 'brand.orange'}
            color={message.isBot ? 'black' : 'white'}
            py={2}
            px={4}
            borderRadius="lg"
            maxW="80%"
          >
            <Text>{message.text}</Text>
          </Box>
        ))}
        {loading && (
          <Box alignSelf="flex-start" bg="gray.100" py={2} px={4} borderRadius="lg">
            <Text>Typing...</Text>
          </Box>
        )}
      </VStack>

      {/* Input */}
      <HStack p={4} bg="gray.50">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          colorScheme="orange"
          onClick={handleSend}
          loading={loading}
        >
          Send
        </Button>
      </HStack>
    </Box>
  )
}

export default ChatBot
