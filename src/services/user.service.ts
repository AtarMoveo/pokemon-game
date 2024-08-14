import { UserPokemons } from "../data/types/user";
import { utilService } from "./util.service";

// const users: User[] = [
//     { id: '123', name: 'atar', password: 'atar', email: 'atarmor92@gmail.com' }
// ]

const USER_POKEMONS_DB = 'userPokemonsDb'

let usersPokemons: UserPokemons[] = []
createUserPokemons()

function createUserPokemons() {
    const pokemons = utilService.loadFromStorage(USER_POKEMONS_DB)
    if (pokemons) return usersPokemons = pokemons
    usersPokemons = [
        { userId: '123', pokemonIds: [1, 7, 20, 43, 50, 56, 25] }
    ]
    utilService.saveToStorage(USER_POKEMONS_DB, usersPokemons)
}

function getUserPokemonsIds(userId: string) {
    const userPokemons = usersPokemons.find(user => userId === user.userId)
    if (userPokemons) {
        return userPokemons.pokemonIds
    }
}

function addUserPokemon(userId: string, pokemonId: number) {
    const userPokemonsIdx = usersPokemons.findIndex(user => userId === user.userId)
    if (userPokemonsIdx <= -1) return

    usersPokemons[userPokemonsIdx].pokemonIds.unshift(pokemonId)
    utilService.saveToStorage(USER_POKEMONS_DB, usersPokemons)
}

function removeUserPokemon(userId: string, pokemonId: number) {
    const userPokemonsIdx = usersPokemons.findIndex(user => userId === user.userId)
    if (userPokemonsIdx <= -1) return

    usersPokemons[userPokemonsIdx].pokemonIds = usersPokemons[userPokemonsIdx].pokemonIds.filter(id => id !== pokemonId)
    utilService.saveToStorage(USER_POKEMONS_DB, usersPokemons)
}

export const userService = {
    getUserPokemonsIds,
    addUserPokemon,
    removeUserPokemon
}