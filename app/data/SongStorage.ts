import AsyncStorage from '@react-native-async-storage/async-storage'

export type SongData = {
    imageUri: string
    title: string
    songUri: string
}

const SONG_KEY = 'hidden-music-songs'

export async function saveSongToStorage(song: SongData) {
    try {
        const songs = await fetchSongs()
        songs.push(song)

        await AsyncStorage.setItem(SONG_KEY, JSON.stringify(songs))
    } catch (e) {
        console.error(e)
    }
}

export async function fetchSongs(): Promise<SongData[]> {
    try {
        const songsString = await AsyncStorage.getItem(SONG_KEY)

        if (songsString) {
            const songsParsed = JSON.parse(songsString)
            return songsParsed as SongData[]
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
