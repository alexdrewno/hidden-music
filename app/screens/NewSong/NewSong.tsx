import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import { TextInput } from '../../components/TextInput/TextInput'
import { getDocumentAsync, DocumentResult } from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { saveSongToStorage } from '../../data/SongStorage'
import { useNavigation } from '@react-navigation/native'
import { THEME } from '../../styles/Colors'
import { useMusicContext } from '../../hooks/useMusicContext'
import { Track } from 'react-native-track-player'

export function NewSong() {
    const [songFile, setSongFile] = useState<DocumentResult>()
    const [image, setImage] = useState<string>()
    const [title, setTitle] = useState<string>('')
    const { fetchAllSongs } = useMusicContext()

    const navigation = useNavigation()

    async function onPressAddFile() {
        try {
            const result: DocumentResult = await getDocumentAsync({
                type: 'audio/*',
            })

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
                const songData: Track = {
                    url: songFile.uri,
                    title: title,
                    artwork: image,
                }

                await saveSongToStorage(songData)
                await fetchAllSongs()
                navigation.goBack()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>New Song</Text>
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={onPressImage}
                >
                    {image && (
                        <Image style={styles.image} source={{ uri: image }} />
                    )}
                </TouchableOpacity>

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

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={saveSong}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.main,
    },

    card: {
        padding: 20,
        width: '80%',
        backgroundColor: 'white',

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
    },

    imageContainer: {
        width: 100,
        height: 100,
        borderWidth: 0.5,
        marginBottom: 15,
    },

    image: {
        flex: 1,
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

    buttonRow: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
