import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import { MusicList } from './MusicList'
import { NavigationContainer } from '@react-navigation/native'
import { MusicProvider } from '../../hooks/useMusicContext'
import { generateSong } from '../../utils/generate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SONG_KEY } from '../../data/SongStorage'

describe('MusicList', () => {
    test('renders initial elements', async () => {
        const { findByText, getByText } = render(
            <NavigationContainer>
                <MusicProvider>
                    <MusicList />
                </MusicProvider>
            </NavigationContainer>
        )

        expect(await findByText('Add')).toBeTruthy()
        expect(getByText('Edit')).toBeTruthy()
        expect(getByText('Not currently playing')).toBeTruthy()
    })

    test('renders songs', async () => {
        const songs = [generateSong(), generateSong()]
        await AsyncStorage.setItem(SONG_KEY, JSON.stringify(songs))

        const { findByText, getByText } = render(
            <NavigationContainer>
                <MusicProvider>
                    <MusicList />
                </MusicProvider>
            </NavigationContainer>
        )

        expect(await findByText('Add')).toBeTruthy()
        expect(getByText('Edit')).toBeTruthy()
        expect(getByText('Not currently playing')).toBeTruthy()

        expect(await findByText(songs[0].title)).toBeTruthy()
        expect(getByText(songs[1].title)).toBeTruthy()
    })

    test('pressing edit should render x-buttons', async () => {
        const songs = [generateSong(), generateSong()]
        await AsyncStorage.setItem(SONG_KEY, JSON.stringify(songs))

        const { findByText, getByText } = render(
            <NavigationContainer>
                <MusicProvider>
                    <MusicList />
                </MusicProvider>
            </NavigationContainer>
        )

        const editButton = await findByText('Edit')
        expect(editButton).toBeTruthy()

        fireEvent.press(editButton)

        expect(await findByText('Done')).toBeTruthy()
    })
})
