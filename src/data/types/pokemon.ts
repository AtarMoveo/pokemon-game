export interface Pokemon {
    id: number
    name: { english: string; japanese: string; chinese: string; french: string }
    type: string[]
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