import { Box, HStack, Text, VStack, Icon, Circle } from '@chakra-ui/react'
import { FaFire } from 'react-icons/fa'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const Calendar = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const completedDays = 4 // This would come from your backend

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg="glass.white"
      backdropFilter="blur(20px)"
      borderRadius="3xl"
      p={6}
      w="full"
      position="relative"
      overflow="hidden"
      border="1px solid"
      borderColor="glass.border"
      boxShadow="cosmic"
      _before={{
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(155, 89, 182, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}
    >
      {/* Cosmic glow effect */}
      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        width="120px"
        height="120px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(255, 159, 74, 0.4) 0%, transparent 70%)"
        filter="blur(40px)"
        pointerEvents="none"
      />

      {/* Streak Banner */}
      <MotionBox
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <HStack
          bg="linear-gradient(135deg, #FF9F4A 0%, #F39C12 100%)"
          color="white"
          p={4}
          borderRadius="2xl"
          mb={6}
          gap={3}
          position="relative"
          overflow="hidden"
          boxShadow="nebula"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)"
            backgroundSize="200% 100%"
            animation="shimmer 3s infinite"
          />
          <Icon 
            as={FaFire} 
            boxSize={6}
            filter="drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))"
            animation="pulse 2s infinite"
          />
          <VStack align="start" gap={0} position="relative">
            <Text fontWeight="bold" fontSize="xl" fontFamily="fonts.heading">
              {completedDays} days streak!
            </Text>
            <Text fontSize="sm" opacity={0.9}>Be ready to unlock next achievement!</Text>
          </VStack>
        </HStack>
      </MotionBox>

      {/* Calendar Days */}
      <HStack justify="space-between" px={2}>
        {days.map((day, index) => (
          <MotionBox
            key={`${day}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
          >
            <VStack gap={3}>
              <Text 
                color="whiteAlpha.700" 
                fontSize="sm" 
                fontWeight="500"
                fontFamily="fonts.heading"
                letterSpacing="wider"
              >
                {day}
              </Text>
              <Circle
                as={motion.div}
                size="45px"
                bg={index < completedDays 
                  ? 'linear-gradient(135deg, #9B59B6 0%, #3498DB 100%)' 
                  : 'glass.light'
                }
                color={index < completedDays ? 'white' : 'whiteAlpha.400'}
                border="1px solid"
                borderColor={index < completedDays ? 'transparent' : 'glass.border'}
                position="relative"
                _hover={{ scale: 1.1 }}
                _active={{ scale: 0.95 }}
                cursor="pointer"
                fontSize="sm"
                fontWeight="bold"
                boxShadow={index < completedDays ? 'aurora' : 'none'}
              >
                {index < completedDays ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    ✓
                  </motion.div>
                ) : (
                  <Text opacity={0.3}>{index + 1}</Text>
                )}
              </Circle>
            </VStack>
          </MotionBox>
        ))}
      </HStack>
    </MotionBox>
  )
}

export default Calendar
