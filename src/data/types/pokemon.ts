export interface Pokemon {
    id: number
    name: PokemonName
    type: string[]
    species: string
    description: string
    evolution?: { prev: [string, string] }
    profile: PokemonProfile
    image: PokemonImage
}

interface PokemonName {
    english: string
    japanese: string
    chinese: string
    french: string
}

interface PokemonProfile {
    height: string
    weight: string
    gender: string
    ability: [string, string][]
}

interface PokemonImage {
    sprite: string
    thumbnail: string
    hires: string
}

export interface BasicPokemon {
    id: number
    name: string
    image: string
    description: string
    powerLevel: number
    hpLevel: number
}