import { VStack, Button, Text, Box, HStack, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { FaRobot } from 'react-icons/fa'
import VideoRecorder from '../components/VideoRecorder'

interface FeaturesProps {
  onChatClick: () => void
}

const Features = ({ onChatClick }: FeaturesProps) => {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <VStack gap={4} w="full">
      {isRecording ? (
        <VideoRecorder onClose={() => setIsRecording(false)} />
      ) : (
        <>
          {/* Record Vlog Button */}
          <Button
            w="full"
            variant="outline"
            color="white"
            borderColor="white"
            p={6}
            onClick={() => setIsRecording(true)}
          >
            <HStack justify="space-between" w="full">
              <Box textAlign="left">
                <Text fontWeight="bold">Record Vlog</Text>
                <Text fontSize="sm" opacity={0.8}>
                  Share your daily experiences
                </Text>
              </Box>
              <Text>→</Text>
            </HStack>
          </Button>

          {/* Start Meditation Button */}
          <Button
              w="full"
              variant="outline"
              color="white"
              borderColor="white"
              p={6}
              onClick={onChatClick}
            >
            <HStack justify="space-between" w="full">
              <Box textAlign="left">
                <Text fontWeight="bold">Start Meditation</Text>
                <Text fontSize="sm" opacity={0.8}>
                  Find your inner peace
                </Text>
              </Box>
              <Text>→</Text>
            </HStack>
          </Button>

          {/* Chat Button */}
          <Box
            bg="white"
            p={6}
            borderRadius="xl"
            w="full"
          >
            <VStack align="start" gap={4}>
              <HStack>
                <Icon as={FaRobot} />
                <Text fontWeight="bold" color="black">Chat With Maitri</Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                Your chat companion is here
              </Text>
              <Button
                    bg="brand.orange"
                    color="white"
                    _hover={{ bg: 'orange.400' }}
                    onClick={onChatClick}
                  >
                    <HStack gap={2}>
                      <Text>Chat</Text>
                      <Text as="span">→</Text>
                    </HStack>
                Ask Now
              </Button>
            </VStack>
          </Box>
        </>
      )}
    </VStack>
  )
}

export default Features
