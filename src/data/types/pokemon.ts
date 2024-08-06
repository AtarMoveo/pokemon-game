export interface Pokemon {
    id: number
    name: PokemonName
    type: string[]
    base: PokemonBase
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

interface PokemonBase {
    HP: number
    Attack: number
    Defense: number
}

export interface BasicPokemon {
    id: number
    name: string
    image: string
    thumbnail: string
    description: string
    powerLevel: number
    hpLevel: number
    height: string
    weight: string
    type: string[]
}

export interface SortBy {
    name?: 1 | -1
    power?: 1 | -1
    hp?: 1 | -1
}

export interface SortOption {
    label: 'Name A-Z' | 'Name Z-A' | 'Power (High to low)' | 'Power (Low to high)' | 'HP (High to low)' | 'HP (Low to high)'
    sortBy: SortBy
}