import { Pokemon } from "../data/types/pokemon";
import { httpService } from "./http.service";

async function addPokemonToUser(userId: number, pokemonId: number) {
    try {
        await httpService.post<Pokemon>(`user-pokemons/${userId}`, { pokemonId })
    } catch (error) {
        console.error('Error adding Pokemon to user:', error)
        throw new Error('Failed to add Pokemon to user')
    }
}

export async function removePokemonFromUser(userId: number, pokemonId: number) {
    try {
        const result = await httpService.delete(`user-pokemons/${userId}`, { pokemonId })
        return result
    } catch (error) {
        console.error('Error removing Pokemon from user:', error)
        throw new Error('Failed to remove Pokemon from user')
    }
}

export const userService = {
    addPokemonToUser,
    removePokemonFromUser
}