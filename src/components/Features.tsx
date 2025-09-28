import { VStack, Button, Text, Box, HStack, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { FaVideo, FaRobot, FaArrowRight } from 'react-icons/fa'
import { GiMeditation } from "react-icons/gi"
import { HiSparkles } from 'react-icons/hi'
import { motion } from 'framer-motion'
import VideoRecorder from '../components/VideoRecorder'

interface FeaturesProps {
  onChatClick: () => void
}

const MotionBox = motion(Box)
const MotionButton = motion(Button)

const Features = ({ onChatClick }: FeaturesProps) => {
  const [isRecording, setIsRecording] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: '100%' }}
    >
      <VStack gap={5} w="full">
        {isRecording ? (
          <VideoRecorder onClose={() => setIsRecording(false)} />
        ) : (
          <>
            {/* Record Vlog Button */}
            <MotionBox w="full">
              <Button
                as={MotionButton}
                w="full"
                h="auto"
                p={6}
                bg="glass.white"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="glass.border"
                color="white"
                onClick={() => setIsRecording(true)}
                position="relative"
                overflow="hidden"
                _hover={{
                  borderColor: 'whiteAlpha.400',
                  bg: 'whiteAlpha.200',
                  transform: 'translateY(-2px)',
                  boxShadow: 'cosmic'
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s',
                }}
              >
                <HStack justify="space-between" w="full">
                  <HStack gap={4}>
                    <Box
                      p={3}
                      borderRadius="xl"
                      bg="whiteAlpha.200"
                      color="brand.stardust"
                    >
                      <Icon as={FaVideo} boxSize={5} />
                    </Box>
                    <Box textAlign="left">
                      <Text fontWeight="bold" fontSize="lg" fontFamily="fonts.heading">
                        Record Vlog
                      </Text>
                      <Text fontSize="sm" opacity={0.8}>
                        Share your cosmic journey
                      </Text>
                    </Box>
                  </HStack>
                  <Icon 
                    as={FaArrowRight} 
                    boxSize={5} 
                    color="whiteAlpha.600"
                    transition="transform 0.3s"
                    _groupHover={{ transform: 'translateX(5px)' }}
                  />
                </HStack>
              </Button>
            </MotionBox>

            {/* Start Meditation Button */}
            <MotionBox w="full">
              <Button
                as={MotionButton}
                w="full"
                h="auto"
                p={6}
                bg="glass.white"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="glass.border"
                color="white"
                onClick={() => console.log('Meditation feature coming soon!')}
                position="relative"
                overflow="hidden"
                _hover={{
                  borderColor: 'whiteAlpha.400',
                  bg: 'whiteAlpha.200',
                  transform: 'translateY(-2px)',
                  boxShadow: 'aurora'
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(155, 89, 182, 0.2), transparent)',
                  transition: 'left 0.5s',
                }}
              >
                <HStack justify="space-between" w="full">
                  <HStack gap={4}>
                    <Box
                      p={3}
                      borderRadius="xl"
                      bg="whiteAlpha.200"
                      color="brand.cosmic"
                    >
                      <Icon as={GiMeditation} boxSize={5} />
                    </Box>
                    <Box textAlign="left">
                      <Text fontWeight="bold" fontSize="lg" fontFamily="fonts.heading">
                        Start Meditation
                      </Text>
                      <Text fontSize="sm" opacity={0.8}>
                        Find peace in the cosmos
                      </Text>
                    </Box>
                  </HStack>
                  <Icon 
                    as={FaArrowRight} 
                    boxSize={5} 
                    color="whiteAlpha.600"
                    transition="transform 0.3s"
                    _groupHover={{ transform: 'translateX(5px)' }}
                  />
                </HStack>
              </Button>
            </MotionBox>

            {/* Chat with Maitri Card */}
            <MotionBox
              w="full"
              bg="linear-gradient(135deg, rgba(155, 89, 182, 0.2) 0%, rgba(52, 152, 219, 0.2) 100%)"
              backdropFilter="blur(20px)"
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="glass.border"
              position="relative"
              overflow="hidden"
              whileHover={{ scale: 1.02 }}
              boxShadow="cosmic"
              _before={{
                content: '""',
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255, 159, 74, 0.1) 0%, transparent 50%)',
                animation: 'pulse 4s ease-in-out infinite',
              }}
            >
              <VStack align="start" gap={4}>
                <HStack gap={3}>
                  <Box
                    p={3}
                    borderRadius="xl"
                    bg="linear-gradient(135deg, #FF9F4A 0%, #F39C12 100%)"
                    color="white"
                    boxShadow="nebula"
                  >
                    <Icon as={FaRobot} boxSize={6} />
                  </Box>
                  <Box>
                    <HStack gap={2}>
                      <Text fontWeight="bold" color="white" fontSize="xl" fontFamily="fonts.heading">
                        Chat With Maitri
                      </Text>
                      <Icon as={HiSparkles} color="brand.stardust" boxSize={5} />
                    </HStack>
                    <Text fontSize="sm" color="whiteAlpha.800">
                      Your AI companion in the cosmos
                    </Text>
                  </Box>
                </HStack>
                
                <Box 
                  w="full" 
                  h="1px" 
                  bg="linear-gradient(90deg, transparent, whiteAlpha.300, transparent)"
                />
                
                <Text fontSize="sm" color="whiteAlpha.700" lineHeight="tall">
                  Connect with Maitri for guidance, support, and cosmic wisdom on your journey to inner peace.
                </Text>
                
                <Button
                  as={MotionButton}
                  bg="linear-gradient(135deg, #FF9F4A 0%, #F39C12 100%)"
                  color="white"
                  size="lg"
                  fontFamily="fonts.heading"
                  fontWeight="600"
                  onClick={onChatClick}
                  boxShadow="nebula"
                  _hover={{
                    boxShadow: '0 0 30px rgba(255, 159, 74, 0.6)',
                    transform: 'translateY(-2px)'
                  }}
                >
                  Start Cosmic Chat
                </Button>
              </VStack>
            </MotionBox>
          </>
        )}
      </VStack>
    </motion.div>
  )
}

export default Features
