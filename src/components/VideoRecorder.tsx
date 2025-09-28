import { useRef, useState, useEffect, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { Box, Button, VStack, HStack, Text, Icon, Select } from '@chakra-ui/react'
import { FaVideo, FaTimes, FaCamera } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Webcam from 'react-webcam'
import axios from 'axios'

interface VideoRecorderProps {
  onClose: () => void
}

const MotionBox = motion(Box)

const VideoRecorder = ({ onClose }: VideoRecorderProps) => {
  const webcamRef = useRef<Webcam>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recording, setRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [cameraReady, setCameraReady] = useState(false)
  const [recordingMimeType, setRecordingMimeType] = useState<string>('video/webm')

  // Get available camera devices
  const handleDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
    const videoDevices = mediaDevices.filter(({ kind }) => kind === 'videoinput')
    setDevices(videoDevices)
    
    // Auto-select first device if none selected
    if (videoDevices.length > 0 && !selectedDeviceId) {
      setSelectedDeviceId(videoDevices[0].deviceId)
    }
  }, [selectedDeviceId])

  useEffect(() => {
    // Request camera permissions and enumerate devices
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices)
      })
      .catch((err) => {
        console.error('Error accessing media devices:', err)
        setError('Camera permission denied or no camera found. Please check your camera settings.')
      })
  }, [handleDevices])

  const handleStartRecording = () => {
    setRecordedChunks([])
    if (webcamRef.current?.stream) {
      // Try to use MP4 format if supported, otherwise fall back to WebM
      const mimeTypes = [
        'video/mp4',
        'video/webm;codecs=h264',
        'video/webm',
      ]
      
      let selectedMimeType = 'video/webm' // default fallback
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType
          break
        }
      }
      
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: selectedMimeType
      })
      mediaRecorderRef.current.ondataavailable = handleDataAvailable
      mediaRecorderRef.current.start()
      setRecording(true)
      
      // Store the mime type for later use
      setRecordingMimeType(selectedMimeType)
    }
  }

  const handleDataAvailable = ({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => [...prev, data])
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  const handleUpload = async () => {
    if (recordedChunks.length) {
      // Determine file extension based on mime type
      let fileExtension = 'webm'
      if (recordingMimeType.includes('mp4')) {
        fileExtension = 'mp4'
      }
      
      const blob = new Blob(recordedChunks, {
        type: recordingMimeType
      })
      const formData = new FormData()
      formData.append('file', blob, `recording.${fileExtension}`)

      try {
        await axios.post('http://localhost:5000/upload/video', formData)
        onClose()
      } catch (error) {
        console.error('Error uploading video:', error)
      }
    }
  }

  // Handle webcam user media loaded
  const handleUserMedia = () => {
    setCameraReady(true)
    setError('')
  }

  // Handle webcam user media error
  const handleUserMediaError = (error: string | DOMException) => {
    console.error('Webcam error:', error)
    setCameraReady(false)
    setError('Failed to access camera. Please ensure camera permissions are granted and try refreshing the page.')
  }

  // Video constraints - more flexible to support various cameras
  const videoConstraints = {
    deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
    // Remove strict resolution requirements to support more cameras
    width: { ideal: 1280 },
    height: { ideal: 720 },
    // Remove facingMode to support all camera types including virtual cameras
  }

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      bg="glass.white"
      backdropFilter="blur(20px)"
      p={6}
      borderRadius="2xl"
      w="full"
      border="1px solid"
      borderColor="glass.border"
      boxShadow="cosmic"
    >
      <VStack gap={5} w="full">
        {/* Header */}
        <HStack justify="space-between" w="full">
          <HStack gap={3}>
            <Box
              p={2}
              borderRadius="lg"
              bg="linear-gradient(135deg, #FF9F4A 0%, #F39C12 100%)"
              color="white"
            >
              <Icon as={FaVideo} boxSize={5} />
            </Box>
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              color="white"
              fontFamily="fonts.heading"
            >
              Record Your Cosmic Journey
            </Text>
          </HStack>
          <Button
            size="sm"
            variant="ghost"
            color="whiteAlpha.700"
            onClick={onClose}
            _hover={{ bg: 'whiteAlpha.200' }}
            borderRadius="lg"
          >
            <Icon as={FaTimes} />
          </Button>
        </HStack>

        {/* Camera selection dropdown */}
        {devices.length > 0 && (
          <Box w="full">
            <HStack mb={2}>
              <Icon as={FaCamera} color="whiteAlpha.700" boxSize={4} />
              <Text fontSize="sm" color="whiteAlpha.800" fontWeight="500">
                Camera Source
              </Text>
            </HStack>
            <select
              value={selectedDeviceId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedDeviceId(e.target.value)}
            >
              <option value="">Select Camera</option>
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId.substring(0, 8)}...`}
                </option>
              ))}
            </select>
          </Box>
        )}

        {/* Error message */}
        {error && (
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            w="full"
            p={3}
            bg="rgba(231, 76, 60, 0.1)"
            borderRadius="lg"
            border="1px solid"
            borderColor="rgba(231, 76, 60, 0.3)"
            backdropFilter="blur(10px)"
          >
            <Text color="brand.nebula" fontSize="sm">
              ⚠️ {error}
            </Text>
          </MotionBox>
        )}

        <Box 
          w="full" 
          h="400px" 
          bg="space.deep" 
          borderRadius="xl" 
          overflow="hidden" 
          position="relative"
          border="1px solid"
          borderColor="glass.border"
          boxShadow="inset 0 0 20px rgba(0, 0, 0, 0.5)"
        >
          <Webcam
            audio={true}
            ref={webcamRef}
            width="100%"
            height="100%"
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
          />
          
          {/* Recording indicator */}
          {recording && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              position="absolute"
              top={4}
              left={4}
              bg="rgba(231, 76, 60, 0.9)"
              color="white"
              px={3}
              py={2}
              borderRadius="full"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Box
                w={2}
                h={2}
                bg="white"
                borderRadius="full"
                animation="pulse 1s infinite"
              />
              <Text fontSize="sm" fontWeight="600">REC</Text>
            </MotionBox>
          )}
          
          {!cameraReady && !error && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
            >
              <VStack gap={3}>
                <Box
                  w={16}
                  h={16}
                  borderRadius="full"
                  border="3px solid"
                  borderColor="brand.orange"
                  borderTopColor="transparent"
                  animation="spin 1s linear infinite"
                />
                <Text color="whiteAlpha.800" fontSize="lg">
                  Initializing cosmic camera...
                </Text>
              </VStack>
            </Box>
          )}
        </Box>
      
        <HStack gap={4} w="full">
          {!recording ? (
            <>
              <Button
                as={motion.button}
                bg="linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)"
                color="white"
                size="lg"
                onClick={handleStartRecording}
                flex={1}
                disabled={!cameraReady}
                fontFamily="fonts.heading"
                fontWeight="600"
                _hover={{
                  boxShadow: 'nebula',
                  transform: 'translateY(-2px)'
                }}
                _disabled={{
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }}
              >
                Start Recording
              </Button>
              <Button
                variant="outline"
                color="whiteAlpha.800"
                borderColor="glass.border"
                onClick={onClose}
                _hover={{
                  bg: 'whiteAlpha.100',
                  borderColor: 'whiteAlpha.400'
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              as={motion.button}
              bg="glass.white"
              backdropFilter="blur(10px)"
              color="white"
              border="1px solid"
              borderColor="glass.border"
              size="lg"
              onClick={handleStopRecording}
              flex={1}
              fontFamily="fonts.heading"
              fontWeight="600"
              _hover={{
                bg: 'whiteAlpha.200',
                borderColor: 'whiteAlpha.400'
              }}
            >
              Stop Recording
            </Button>
          )}
        </HStack>

        {recordedChunks.length > 0 && !recording && (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            w="full"
          >
            <Button
              as={motion.button}
              bg="linear-gradient(135deg, #9B59B6 0%, #3498DB 100%)"
              color="white"
              size="lg"
              onClick={handleUpload}
              w="full"
              fontFamily="fonts.heading"
              fontWeight="600"
              boxShadow="aurora"
              _hover={{
                boxShadow: '0 0 30px rgba(155, 89, 182, 0.6)',
                transform: 'translateY(-2px)'
              }}
            >
              Upload to the Cosmos
            </Button>
          </MotionBox>
        )}
      </VStack>
    </MotionBox>
  )
}

export default VideoRecorder
