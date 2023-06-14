import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { MusicList } from '../screens/MusicList/MusicList'
import { NewSong } from '../screens/NewSong/NewSong'

const AppStackNavigator = createStackNavigator()

const screenOptions = {
    headerShown: false,
}

export function AppNavigator() {
    return (
        <AppStackNavigator.Navigator screenOptions={screenOptions}>
            <AppStackNavigator.Screen name='Music List' component={MusicList} />
            <AppStackNavigator.Screen name='New Song' component={NewSong} />
        </AppStackNavigator.Navigator>
    )
}
