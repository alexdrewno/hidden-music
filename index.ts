import { registerRootComponent } from 'expo'
import TrackPlayer from 'react-native-track-player'
import App from './App'
import { PlaybackService } from './app/services/PlaybackService'

registerRootComponent(App)
TrackPlayer.registerPlaybackService(() => PlaybackService)
