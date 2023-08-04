import React from 'react'

import {
    TouchableOpacity,
    Image,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native'
import PlayImg from '../../assets/play.png'

type PlayProps = {
    onPress: (event: GestureResponderEvent) => void
}

export function PlayButton({ onPress }: PlayProps) {
    return (
        <TouchableOpacity
            testID='play-button'
            style={styles.container}
            onPress={onPress}
        >
            <Image style={styles.img} source={PlayImg} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    img: {
        width: 20,
        height: 20,
        tintColor: 'white',
    },
})
