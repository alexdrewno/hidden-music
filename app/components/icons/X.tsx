import React from 'react'

import {
    TouchableOpacity,
    Image,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native'
import XImg from '../../assets/x.png'

type XProps = {
    onPress: (event: GestureResponderEvent) => void
}

export function XButton({ onPress }: XProps) {
    return (
        <TouchableOpacity
            testID='x-button'
            style={styles.container}
            onPress={onPress}
        >
            <Image style={styles.img} source={XImg} />
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
        width: 30,
        height: 30,
    },
})
