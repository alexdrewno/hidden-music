import React from 'react'
import { View, Text, TextInput as RNTextInput, StyleSheet } from 'react-native'

type TextInputProps = {
    title: string
    onChangeText: (text: string) => void
}

export function TextInput(props: TextInputProps) {
    const { title, onChangeText } = props

    return (
        <View>
            <Text style={styles.titleStyle}>{title}</Text>
            <RNTextInput
                onChangeText={onChangeText}
                style={styles.textInputContainer}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        borderWidth: 0.5,
        borderColor: 'black',
        height: 30,
        padding: 5,
    },

    titleStyle: {
        fontSize: 16,
        fontWeight: '500',
    },
})
