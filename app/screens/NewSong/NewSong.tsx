import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import { TextInput } from '../../components/TextInput/TextInput'
import { getDocumentAsync, DocumentResult } from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { saveSongToStorage, SongData } from '../../data/SongStorage'
import { useNavigation } from '@react-navigation/native'

export function NewSong() {
    const [songFile, setSongFile] = useState<DocumentResult>()
    const [image, setImage] = useState<string>()
    const [title, setTitle] = useState<string>('')

    const navigation = useNavigation()

    async function onPressAddFile() {
        try {
            const result: DocumentResult = await getDocumentAsync({
                type: 'audio/*',
            })
            console.log(result)

            if (result.type === 'success') {
                setSongFile(result)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function onPressImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.canceled) {
                setImage(result.assets[0].uri)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function saveSong() {
        try {
            if (title && image && songFile?.type === 'success') {
                const songData: SongData = {
                    imageUri: image,
                    songUri: songFile.uri,
                    title: title,
                }
                console.log('SAVING SONG...:', songData)

                await saveSongToStorage(songData)
                navigation.goBack()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={onPressImage}
            >
                {image && (
                    <Image style={styles.image} source={{ uri: image }} />
                )}
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Song Details</Text>
                <TextInput onChangeText={setTitle} title='Title' />

                <View style={styles.fileContainer}>
                    <Text style={styles.subtitle}>Song</Text>
                    <TouchableOpacity
                        style={styles.selectFile}
                        onPress={onPressAddFile}
                    >
                        <Text>
                            {songFile?.type === 'success'
                                ? songFile.name
                                : 'Select a file'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={saveSong}>
                    <Text> Done </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imageContainer: {
        width: '100%',
        height: '33%',
        backgroundColor: 'gray',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    image: {
        flex: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    fileContainer: {
        marginVertical: 15,
    },

    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 15,
    },

    subtitle: {
        fontSize: 16,
        fontWeight: '500',
    },

    selectFile: {
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderWidth: 0.5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    contentContainer: {
        padding: 20,
    },
})
