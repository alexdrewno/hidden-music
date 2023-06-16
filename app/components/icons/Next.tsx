import React from 'react'

import {
    TouchableOpacity,
    Image,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native'
import NextImg from '../../assets/next.png'

type NextProps = {
    onPress: (event: GestureResponderEvent) => void
}

export function NextButton({ onPress }: NextProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.img} source={NextImg} />
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
