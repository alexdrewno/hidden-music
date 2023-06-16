import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { fetchSongs } from '../data/SongStorage'

import TrackPlayer, {
    Event,
    State,
    Track,
    useTrackPlayerEvents,
} from 'react-native-track-player'

type MusicProviderProps = {
    children: ReactNode
}

type MusicContextType =
    | {
          curSong?: Track
          songs: Track[]
          isPlaying: boolean
          setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
          playSong: (_: Track) => void
          pauseSong: () => Promise<void>
          nextSong: () => Promise<void>
          previousSong: () => Promise<void>
          resumeSong: () => Promise<void>
          fetchAllSongs: () => Promise<void>
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
    const [songs, setSongs] = useState<Track[]>([])
    const [curSong, setCurSong] = useState<Track>()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        if (
            event.type === Event.PlaybackTrackChanged &&
            event.nextTrack != null
        ) {
            const song = songs[event.nextTrack]

            if (song) {
                setCurSong(song)
            }
        }
    })

    useTrackPlayerEvents([Event.PlaybackState], async (event) => {
        if (event.state === State.Playing) {
            setIsPlaying(true)
        }
        if (event.state === State.Paused || event.state === State.Stopped) {
            setIsPlaying(false)
        }
    })

    async function fetchAllSongs() {
        const fetchedSongs = await fetchSongs()

        await TrackPlayer.reset()
        await TrackPlayer.add(fetchedSongs)

        setSongs(fetchedSongs)
    }

    async function playSong(song: Track) {
        try {
            const indexOfSong = songs.indexOf(song)

            if (indexOfSong !== -1) {
                await TrackPlayer.skip(indexOfSong)
                await TrackPlayer.play()
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function pauseSong() {
        await TrackPlayer.pause()
    }

    async function resumeSong() {
        await TrackPlayer.play()
    }

    async function nextSong() {
        if (curSong === songs[songs.length - 1]) {
            await TrackPlayer.skip(0)
        } else {
            await TrackPlayer.skipToNext()
        }
    }

    async function previousSong() {
        if (curSong === songs[0]) {
            await TrackPlayer.skip(songs.length - 1)
        } else {
            await TrackPlayer.skipToPrevious()
        }
    }

    useEffect(() => {
        fetchAllSongs()
    }, [])

    return (
        <MusicContext.Provider
            value={{
                curSong,
                songs,
                isPlaying,
                setIsPlaying,
                playSong,
                pauseSong,
                resumeSong,
                fetchAllSongs,
                nextSong,
                previousSong,
            }}
        >
            {children}
        </MusicContext.Provider>
    )
}
