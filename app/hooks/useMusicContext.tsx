import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { fetchSongs, SongData } from '../data/SongStorage'

import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'

type MusicProviderProps = {
    children: ReactNode
}

type MusicContextType =
    | {
          curSong?: SongData
          setCurSong: React.Dispatch<React.SetStateAction<SongData | undefined>>
          songs: SongData[]
          isPlaying: boolean
          setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
          playSong: (_: SongData) => void
          pauseSong: VoidFunction
          resumeSong: VoidFunction
      }
    | undefined

const MusicContext = createContext<MusicContextType>(undefined)

export const useMusicContext = () => {
    const musicContext = useContext(MusicContext)

    if (!musicContext) {
        throw new Error('useMusicContext has to be used within <MusicProvider>')
    }

    return musicContext
}

export const MusicProvider = (props: MusicProviderProps) => {
    const { children } = props
    const [curSong, setCurSong] = useState<SongData>()
    const [songs, setSongs] = useState<SongData[]>([])
    const [sound, setSound] = useState<Sound>()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    async function _fetchAllSongs() {
        const fetchedSongs = await fetchSongs()
        setSongs(fetchedSongs)
    }

    async function playSong(song: SongData) {
        try {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
            })

            const { sound } = await Audio.Sound.createAsync({
                uri: song.songUri,
            })

            setSound(sound)

            await sound.playAsync()
        } catch (e) {
            console.error(e)
        }
    }

    async function pauseSong() {
        await sound?.pauseAsync()
        setIsPlaying(false)
    }

    async function resumeSong() {
        await sound?.playAsync()
        setIsPlaying(true)
    }

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync()
              }
            : undefined
    }, [sound])

    useEffect(() => {
        if (curSong) {
            playSong(curSong)
            setIsPlaying(true)
        }
    }, [curSong])

    useEffect(() => {
        _fetchAllSongs()
    }, [])

    return (
        <MusicContext.Provider
            value={{
                curSong,
                setCurSong,
                songs,
                isPlaying,
                setIsPlaying,
                playSong,
                pauseSong,
                resumeSong,
            }}
        >
            {children}
        </MusicContext.Provider>
    )
}
