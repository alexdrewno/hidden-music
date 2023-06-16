import TrackPlayer, { Event } from 'react-native-track-player'

export const PlaybackService = async function () {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play())

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause())

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        const curSong = await TrackPlayer.getCurrentTrack()
        const queue = await TrackPlayer.getQueue()

        if (curSong === queue.length - 1) {
            TrackPlayer.skip(0)
        } else {
            TrackPlayer.skipToNext()
        }
    })

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        const curSong = await TrackPlayer.getCurrentTrack()
        const queue = await TrackPlayer.getQueue()

        if (curSong === 0) {
            TrackPlayer.skip(queue.length - 1)
        } else {
            TrackPlayer.skipToPrevious()
        }
    })
}
