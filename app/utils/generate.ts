import { faker } from '@faker-js/faker'

type GenerateSongOverrides = {
    url?: string
    title?: string
    artwork?: string
}

export function generateSong(overrides?: GenerateSongOverrides) {
    return {
        url: overrides?.url ?? '',
        title: overrides?.title ?? faker.lorem.words(3),
        artwork: overrides?.artwork ?? '',
    }
}
