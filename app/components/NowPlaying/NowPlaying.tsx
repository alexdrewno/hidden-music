import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'

import { SongData } from '../../data/SongStorage'

type NowPlayingProps = {
    song?: SongData
}

export function NowPlaying({ song }: NowPlayingProps) {
    const [sound, setSound] = useState<Sound>()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    async function playSound(song: SongData) {
        try {
            console.log('Loading Sound')

            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
            })

            const { sound } = await Audio.Sound.createAsync({
                uri: song.songUri,
            })

            setSound(sound)

            console.log('Playing Sound')
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
                  console.log('Unloading Sound')
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

    return (
        <View style={styles.container}>
            <Text>{'Now Playing: ' + song?.title} </Text>
            {isPlaying ? (
                <TouchableOpacity style={styles.pause} onPress={pauseSound}>
                    <Text>Pause</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.pause} onPress={resumeSound}>
                    <Text>Play</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 30,
        flexDirection: 'row',
    },

    pause: {},
})
