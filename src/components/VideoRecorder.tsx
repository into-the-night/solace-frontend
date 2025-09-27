import { useRef, useState, useEffect, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { Box, Button, VStack, HStack, Text } from '@chakra-ui/react'
import Webcam from 'react-webcam'
import axios from 'axios'

interface VideoRecorderProps {
  onClose: () => void
}

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
    <VStack gap={4} bg="white" p={6} borderRadius="xl" w="full">
      {/* Camera selection dropdown */}
      {devices.length > 0 && (
        <Box w="full">
          <Text fontSize="sm" mb={2}>Select Camera:</Text>
          <select
            value={selectedDeviceId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedDeviceId(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: 'white',
              fontSize: '14px'
            }}
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
        <Box
          w="full"
          p={3}
          bg="red.50"
          borderRadius="md"
          borderWidth={1}
          borderColor="red.200"
        >
          <Text color="red.600" fontSize="sm">
            ⚠️ {error}
          </Text>
        </Box>
      )}

      <Box w="full" h="400px" bg="gray.900" borderRadius="lg" overflow="hidden" position="relative">
        <Webcam
          audio={true}
          ref={webcamRef}
          width="100%"
          height="100%"
          videoConstraints={videoConstraints}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
        />
        {!cameraReady && !error && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color="white"
            fontSize="lg"
          >
            <Text>Loading camera...</Text>
          </Box>
        )}
      </Box>
      
      <HStack gap={4} w="full">
        {!recording ? (
          <>
            <Button
              colorScheme="red"
              onClick={handleStartRecording}
              flex={1}
              disabled={!cameraReady}
            >
              Start Recording
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </>
        ) : (
          <>
            <Button
              colorScheme="gray"
              onClick={handleStopRecording}
              flex={1}
            >
              Stop Recording
            </Button>
          </>
        )}
      </HStack>

      {recordedChunks.length > 0 && !recording && (
        <Button
          colorScheme="green"
          onClick={handleUpload}
          w="full"
        >
          Upload Video
        </Button>
      )}
    </VStack>
  )
}

export default VideoRecorder
