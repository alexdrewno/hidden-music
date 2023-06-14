import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Button, ScrollView, StyleSheet, View } from 'react-native'
import { SongCard } from '../../components/SongCard'
import { fetchSongs, SongData } from '../../data/SongStorage'
import { NowPlaying } from '../../components/NowPlaying/NowPlaying'

export function MusicList() {
    const navigation = useNavigation()
    const [songs, setSongs] = useState<SongData[]>([])
    const [nowPlaying, setNowPlaying] = useState<SongData>()

    async function _fetchAllSongs() {
        const fetchedSongs = await fetchSongs()
        console.log('FETCHED SONGS: ', fetchedSongs)
        setSongs(fetchedSongs)
    }

    useEffect(() => {
        _fetchAllSongs()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        title='Add'
                        onPress={() => navigation.navigate('New Song')}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {songs.map((song, i) => (
                        <View key={i} style={styles.cardContainer}>
                            <SongCard
                                song={song}
                                onPressPlay={() => setNowPlaying(song)}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
            <NowPlaying song={nowPlaying} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },

    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardContainer: {
        marginVertical: 15,
    },

    buttonContainer: {
        alignSelf: 'flex-end',
    },
})
