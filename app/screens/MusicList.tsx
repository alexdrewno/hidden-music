import React from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'
import { SongCard } from '../components/SongCard'

const TEST_SONGS = [
    {
        title: 'hello 1',
        length: 100,
    },
    {
        title: 'hello 2',
        length: 200,
    },
    {
        title: 'hello 3',
        length: 300,
    },
]

export function MusicList() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {TEST_SONGS.map((song, i) => (
                    <View key={i} style={styles.cardContainer}>
                        <SongCard song={song} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardContainer: {
        marginVertical: 20,
    },
})
