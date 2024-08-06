import { UserPokemons } from "../data/types/user";

// const users: User[] = [
//     { id: '123', name: 'atar', password: 'atar', email: 'atarmor92@gmail.com' }
// ]

const usersPokemons: UserPokemons[] = [
    { userId: '123', pokemonIds: [1, 7, 20, 43, 50, 56, 25] }
]

function getUserPokemonsIds(userId: string) {
    const userPokemons = usersPokemons.find(user => userId === user.userId)
    if (userPokemons) {
        return userPokemons.pokemonIds
    }
}

export const userService = {
    getUserPokemonsIds
}