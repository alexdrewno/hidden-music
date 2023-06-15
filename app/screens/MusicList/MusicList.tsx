import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import { SongCard } from '../../components/SongCard/SongCard'
import { fetchSongs, SongData } from '../../data/SongStorage'
import { NowPlaying } from '../../components/NowPlaying/NowPlaying'
import { THEME } from '../../styles/Colors'

export function MusicList() {
    const navigation = useNavigation()
    const [songs, setSongs] = useState<SongData[]>([])
    const [nowPlaying, setNowPlaying] = useState<SongData>()

    async function _fetchAllSongs() {
        const fetchedSongs = await fetchSongs()
        setSongs(fetchedSongs)
    }

    useEffect(() => {
        _fetchAllSongs()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.buttonContainer}>
                <Button
                    color='white'
                    title='Add'
                    onPress={() => navigation.navigate('New Song')}
                />
            </View>
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}
                >
                    {songs.map((song, i) => (
                        <View key={i} style={styles.cardContainer}>
                            <SongCard
                                song={song}
                                onPressPlay={() => setNowPlaying(song)}
                                isPlaying={song === nowPlaying}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
            <NowPlaying song={nowPlaying} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: THEME.main,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: '#9CA69E',
    },

    scrollContainer: {
        width: '100%',
        marginTop: -10,
        zIndex: -5,
    },

    scrollContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    cardContainer: {
        paddingVertical: 8,
    },

    buttonContainer: {
        backgroundColor: THEME.main,
        alignItems: 'flex-end',
        width: '100%',
        marginBottom: 10,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.07,
        shadowRadius: 1.54,
        elevation: 5,
    },
})
