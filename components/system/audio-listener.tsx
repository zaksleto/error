import React, { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react'
import { AudioWaveform } from './audio-waveform'

interface AudioListenerProps {
  type: 'audio'
  src: string
  avatar: string
}

export function AudioListener({ type, src, avatar }: AudioListenerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isHovering, setIsHovering] = useState(false)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    // Initialize AudioContext and load audio data
    const initAudio = async () => {
      try {
        setIsLoading(true)
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        const response = await fetch(src)
        const arrayBuffer = await response.arrayBuffer()
        const decodedBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer)
        setAudioBuffer(decodedBuffer)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading audio:", error)
        setIsLoading(false)
      }
    }

    initAudio()

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [src])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeChange = (newTime: number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = newTime[0]
      setCurrentTime(newTime[0])
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume[0]
      setVolume(newVolume[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleReset = () => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = 0
      setCurrentTime(0)
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <div 
      className="bg-background rounded-lg shadow-md w-full max-w-3xl mx-auto overflow-hidden transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center p-2 h-[60px]">
        <audio ref={audioRef} src={src} />
        <Avatar className="w-10 h-10 flex-shrink-0 mr-4">
          <AvatarImage src={avatar} alt="Avatar" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div className="flex-grow flex items-center space-x-4">
          <div className="flex-grow">
            {isLoading ? (
              <div className="w-full h-12 bg-gray-200 animate-pulse rounded"></div>
            ) : audioBuffer ? (
              <AudioWaveform audioBuffer={audioBuffer} currentTime={currentTime} duration={duration} />
            ) : (
              <div className="w-full h-12 bg-red-200 rounded flex items-center justify-center">
                Failed to load audio
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-sm text-muted-foreground w-20 text-center">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      {
        false && (
          <>
            <div className="px-4 py-2">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleTimeChange}
                className="w-full"
              />
            </div>
            <div 
              className="flex items-center px-4 transition-all duration-300 ease-in-out overflow-hidden"
              style={{ height: isHovering ? '20px' : '0' }}
            >
              <Volume2 className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          </>
        )
      }
    </div>
  )
}

