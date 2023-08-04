import AsyncStorage from '@react-native-async-storage/async-storage'
import { Track } from 'react-native-track-player'

export const SONG_KEY = 'hidden-music-songs'

export async function saveSongToStorage(song: Track) {
    try {
        const songs = await fetchSongs()
        songs.push(song)

        await AsyncStorage.setItem(SONG_KEY, JSON.stringify(songs))
    } catch (e) {
        console.error(e)
    }
}

export async function removeSongFromStorage(song: Track) {
    try {
        const songs = await fetchSongs()

        const removalIndex = songs.findIndex((e) => {
            return e.url === song.url && e.title === song.title
        })

        if (removalIndex > -1) {
            songs.splice(removalIndex, 1)
            await AsyncStorage.setItem(SONG_KEY, JSON.stringify(songs))
        }
    } catch (e) {
        console.error(e)
    }
}

export async function fetchSongs(): Promise<Track[]> {
    try {
        const songsString = await AsyncStorage.getItem(SONG_KEY)

        if (songsString) {
            const songsParsed = JSON.parse(songsString)
            return songsParsed as Track[]
        }
    } catch (e) {
        console.error(e)
    }

    return []
}

export async function clearSongs() {
    try {
        await AsyncStorage.setItem(SONG_KEY, JSON.stringify([]))
    } catch (e) {
        console.error(e)
    }
}
