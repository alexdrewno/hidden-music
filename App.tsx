import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { MusicProvider } from './app/hooks/useMusicContext'

import { AppNavigator } from './app/navigation/AppNavigation'

export default function App() {
    return (
        <NavigationContainer>
            <MusicProvider>
                <AppNavigator />
            </MusicProvider>
        </NavigationContainer>
    )
}
