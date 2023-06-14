import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type SongCardProps = {
    song: Song
}

type Song = {
    title: string
    length: number
}

// TODO add waveform: https://github.com/juananime/react-native-audiowaveform
//
export function SongCard({ song }: SongCardProps) {
    return (
        <View style={styles.container}>
            <Image style={styles.imageContainer} source={{ uri: '' }} />
            <View style={styles.detailContainer}>
                <View style={styles.waveForm} />
                <View style={styles.subdetailContainer}>
                    <Text>{song.title + ' // ' + song.length}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 350,
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
        backgroundColor: 'yellow',
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
})
