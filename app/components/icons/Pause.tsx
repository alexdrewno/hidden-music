import React from 'react'

import {
    TouchableOpacity,
    Image,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native'
import PauseImg from '../../assets/pause.png'

type PauseProps = {
    onPress: (event: GestureResponderEvent) => void
}

export function PauseButton({ onPress }: PauseProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.img} source={PauseImg} />
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
