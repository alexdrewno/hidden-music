import React from 'react'
import {
    GestureResponderEvent,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { PauseButton } from '../icons/Pause'
import { PlayButton } from '../icons/Play'

type SongCardProps = {
    song: Song
    onPressPlay: (event: GestureResponderEvent) => void
    onPressPause: (event: GestureResponderEvent) => void
    isPlaying: boolean
}

type Song = {
    title: string
    imageUri: string
    songUri: string
}

export function SongCard({
    song,
    onPressPlay,
    onPressPause,
    isPlaying,
}: SongCardProps) {
    return (
        <View style={[isPlaying && styles.selected, styles.container]}>
            <Image
                style={styles.imageContainer}
                source={{ uri: song.imageUri }}
            />
            <View style={styles.detailContainer}>
                <View style={styles.subdetailContainer}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                </View>
                {isPlaying ? (
                    <View style={styles.playPause}>
                        <PauseButton onPress={onPressPause} />
                    </View>
                ) : (
                    <View style={styles.playPause}>
                        <PlayButton onPress={onPressPlay} />
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selected: {
        backgroundColor: '#78807A',
    },

    container: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
    },

    imageContainer: {
        backgroundColor: 'gray',
        width: 80,
        height: 80,
    },

    detailContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    waveForm: {
        flex: 1,
    },

    subdetailContainer: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },

    playPause: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    songTitle: {
        fontWeight: '600',
        color: 'white',
    },

    songSubtitle: {
        fontWeight: '300',
        color: 'white',
    },
})
