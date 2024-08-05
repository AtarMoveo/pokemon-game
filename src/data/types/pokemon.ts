export interface Pokemon {
    id: number
    name: { english: string; japanese: string; chinese: string; french: string }
    type: string[]
    base: {HP: number, Attack: number, Defense: number }
    species: string
    description: string
    evolution?: { prev: [string, string] }
    profile: {
        height: string
        weight: string
        gender: string
        ability: [string, string][]
    }
    image: {
        sprite: string
        thumbnail: string
        hires: string
    }
}

export interface BasicPokemon {
    id: number
    name: string
    image: string
    description: string
    powerLevel: number
    hpLevel: number
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