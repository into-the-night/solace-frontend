import { Box, HStack, Text, VStack, Circle } from '@chakra-ui/react'
import { FaFire } from 'react-icons/fa'

const Calendar = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const completedDays = 4 // This would come from your backend

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={6}
      w="full"
      position="relative"
      overflow="hidden"
    >
      {/* Streak Banner */}
      <HStack
        bg="brand.orange"
        color="white"
        p={4}
        borderRadius="xl"
        mb={4}
        spacing={2}
      >
        <FaFire size={24} />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold" fontSize="lg">
            {completedDays} days streak!
          </Text>
          <Text fontSize="sm">Be Ready to unlock Next hat!</Text>
        </VStack>
      </HStack>

      {/* Calendar Days */}
      <HStack justify="space-between" px={4}>
        {days.map((day, index) => (
          <VStack key={day} spacing={2}>
            <Text color="gray.500" fontSize="sm">
              {day}
            </Text>
            <Circle
              size="40px"
              bg={index < completedDays ? 'brand.orange' : 'gray.100'}
              color={index < completedDays ? 'white' : 'gray.400'}
            >
              {index < completedDays ? '✓' : ''}
            </Circle>
          </VStack>
        ))}
      </HStack>
    </Box>
  )
}

export default Calendar
