import React from 'react'
import { render } from '@testing-library/react-native'

import { MusicList } from './MusicList'
import { NavigationContainer } from '@react-navigation/native'
import { MusicProvider } from '../../hooks/useMusicContext'

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
})
