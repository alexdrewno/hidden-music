import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import { SongCard } from '../../components/SongCard/SongCard'
import { NowPlaying } from '../../components/NowPlaying/NowPlaying'
import { THEME } from '../../styles/Colors'
import { useMusicContext } from '../../hooks/useMusicContext'
import { Track } from 'react-native-track-player'
import { removeSongFromStorage } from '../../data/SongStorage'

export function MusicList() {
    const {
        songs,
        curSong,
        playSong,
        pauseSong,
        isPlaying,
        resumeSong,
        fetchAllSongs,
    } = useMusicContext()

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const navigation = useNavigation()

    function _onPressPlay(song: Track) {
        if (!isPlaying && song === curSong) {
            resumeSong()
        } else {
            playSong(song)
        }
    }

    async function _onPressDelete(song: Track) {
        await removeSongFromStorage(song)
        await fetchAllSongs()
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.buttonContainer}>
                <Button
                    color='white'
                    title='Edit'
                    onPress={() =>
                        setIsEditing((prevIsEditing: boolean) => !prevIsEditing)
                    }
                />
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
                                onPressPlay={() => _onPressPlay(song)}
                                onPressPause={pauseSong}
                                onPressDelete={() => _onPressDelete(song)}
                                isPlaying={song === curSong && isPlaying}
                                isEditing={isEditing}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
            <NowPlaying />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
