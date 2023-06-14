import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

type SongCardProps = {
    song: Song
    onPressPlay: any
}

type Song = {
    title: string
    imageUri: string
    songUri: string
}

export function SongCard({ song, onPressPlay }: SongCardProps) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.imageContainer}
                source={{ uri: song.imageUri }}
            />
            <View style={styles.detailContainer}>
                <View style={styles.subdetailContainer}>
                    <Text>{song.title + ' // ' + 'TODO LENGTH'}</Text>
                </View>
                <TouchableOpacity style={styles.play} onPress={onPressPlay}>
                    <Text>Play</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 100,
        backgroundColor: 'gray',
        flexDirection: 'row',
    },

    imageContainer: {
        backgroundColor: 'gray',
        width: 100,
        height: 100,
    },

    detailContainer: {
        flex: 1,
        flexDirection: 'column',
    },

    waveForm: {
        backgroundColor: 'lightgray',
        flex: 1,
    },

    subdetailContainer: {
        backgroundColor: 'darkgray',
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },

    play: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        alignSelf: 'flex-end',
    },
})
