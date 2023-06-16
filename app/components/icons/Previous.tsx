import React from 'react'

import {
    TouchableOpacity,
    Image,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native'
import PreviousImg from '../../assets/previous.png'

type PreviousProps = {
    onPress: (event: GestureResponderEvent) => void
}

export function PreviousButton({ onPress }: PreviousProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.img} source={PreviousImg} />
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
