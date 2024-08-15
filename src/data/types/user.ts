export interface User {
    id: number
    name: string
    password: string
    email: string
}

export interface UserPokemons {
    userId: number
    pokemonIds: number[]
}