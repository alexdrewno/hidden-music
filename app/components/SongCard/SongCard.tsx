import React from 'react'
import {
    GestureResponderEvent,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Track } from 'react-native-track-player'
import { PauseButton } from '../icons/Pause'
import { PlayButton } from '../icons/Play'
import { XButton } from '../icons/X'

type SongCardProps = {
    song: Track
    onPressPlay: (event: GestureResponderEvent) => void
    onPressPause: (event: GestureResponderEvent) => void
    onPressDelete: (event: GestureResponderEvent) => void
    isPlaying: boolean
    isEditing: boolean
}

export function SongCard({
    song,
    onPressPlay,
    onPressPause,
    onPressDelete,
    isPlaying,
    isEditing,
}: SongCardProps) {
    return (
        <View style={[isPlaying && styles.selected, styles.container]}>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <XButton onPress={onPressDelete} />
                </View>
            )}
            <Image
                style={styles.imageContainer}
                source={{ uri: String(song.artwork) }}
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

    deleteContainer: {
        justifyContent: 'center',
        paddingRight: 8,
    },
})
