import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'

import { SongData } from '../../data/SongStorage'
import { THEME } from '../../styles/Colors'
import { PauseButton } from '../icons/Pause'
import { PlayButton } from '../icons/Play'

type NowPlayingProps = {
    song?: SongData
}

export function NowPlaying({ song }: NowPlayingProps) {
    const [sound, setSound] = useState<Sound>()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    async function playSound(song: SongData) {
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

    async function pauseSound() {
        await sound?.pauseAsync()
        setIsPlaying(false)
    }

    async function resumeSound() {
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
        if (song) {
            playSound(song)
            setIsPlaying(true)
        }
    }, [song])

    if (!song) {
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
                    source={{ uri: song.imageUri }}
                />
                <Text style={styles.songTitleText}>{song.title} </Text>
            </View>
            <View style={styles.buttonContainer}>
                {isPlaying ? (
                    <PauseButton onPress={pauseSound} />
                ) : (
                    <PlayButton onPress={resumeSound} />
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
