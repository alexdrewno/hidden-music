import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useMusicContext } from '../../hooks/useMusicContext'
import { THEME } from '../../styles/Colors'
import { PauseButton } from '../icons/Pause'
import { PlayButton } from '../icons/Play'

export function NowPlaying() {
    const { isPlaying, curSong, pauseSong, resumeSong } = useMusicContext()

    if (!curSong) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Not currently playing</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleAndImage}>
                <Image
                    style={styles.songImage}
                    source={{ uri: curSong.imageUri }}
                />
                <Text style={styles.songTitleText}>{curSong.title}</Text>
            </View>
            <View style={styles.buttonContainer}>
                {isPlaying ? (
                    <PauseButton onPress={pauseSong} />
                ) : (
                    <PlayButton onPress={resumeSong} />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME.main,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.07,
        shadowRadius: 1.54,
        elevation: 5,
    },

    songTitleText: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    songImage: {
        width: 40,
        height: 40,
    },

    titleAndImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
