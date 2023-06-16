import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TrackPlayer, { Capability } from 'react-native-track-player'
import { Asset } from 'expo-asset'

import Play from './app/assets/play.png'
import Pause from './app/assets/pause.png'
import X from './app/assets/x.png'

import { MusicProvider } from './app/hooks/useMusicContext'
import { AppNavigator } from './app/navigation/AppNavigation'

function cacheImages(images: string[]) {
    return images.map((image: string) => {
        return Asset.fromModule(image).downloadAsync()
    })
}

export default function App() {
    async function setup() {
        try {
            cacheImages([Play, Pause, X])
            await TrackPlayer.setupPlayer()
            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        setup()
    }, [])

    return (
        <NavigationContainer>
            <MusicProvider>
                <AppNavigator />
            </MusicProvider>
        </NavigationContainer>
    )
}
