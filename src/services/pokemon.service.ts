import { Pokemon, BasicPokemon, SortBy, SortOption } from "../data/types/pokemon";
import { userService } from "./user.service";

async function fetchPokemons(filterBy: string, sortBy: SortBy | null, page: number, rowsPerPage: number, userId: string | undefined):
    Promise<{ rows: BasicPokemon[], total: number }> {

    const response = await fetch('/data/pokemon.json')
    let pokemons = await response.json()

    if (userId) {
        const userPokemonIds = userService.getUserPokemonsIds(userId)
        pokemons = pokemons.filter((p: Pokemon) => userPokemonIds?.includes(p.id))
    }
    if (filterBy) {
        const regex = new RegExp(filterBy, 'i')
        pokemons = pokemons.filter((p: Pokemon) => regex.test(p.name.english) || regex.test(p.description))
    }
    if (sortBy) {
        if (sortBy.name) pokemons.sort((p1: Pokemon, p2: Pokemon) => (p1.name.english.localeCompare(p2.name.english)) * sortBy.name!)
        if (sortBy.power) pokemons.sort((p1: Pokemon, p2: Pokemon) => (p1.base?.Attack - p2.base?.Attack) * sortBy.power!)
        if (sortBy.hp) pokemons.sort((p1: Pokemon, p2: Pokemon) => (p1.base?.HP - p2.base?.HP) * sortBy.hp!)
    }

    const startIndex = page * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginatedPokemons = pokemons.slice(startIndex, endIndex)
    const reducedPokemons = convertToBasicPokemons(paginatedPokemons)

    return { rows: reducedPokemons, total: pokemons.length }
}

function convertToBasicPokemons(pokemons: Pokemon[]): BasicPokemon[] {
    return pokemons.map((pokemon: Pokemon): BasicPokemon => {
        return {
            image: pokemon.image.hires,
            thumbnail: pokemon.image.thumbnail,
            name: pokemon.name.english,
            id: pokemon.id,
            description: pokemon.description,
            powerLevel: pokemon.base?.Attack,
            hpLevel: pokemon.base?.HP,
            height: pokemon.profile.height,
            weight: pokemon.profile.weight,
            type: pokemon.type
        }
    })
}

const tableColumns = [
    { id: 'thumbnail', label: '', minWidth: 35 },
    { id: 'name', label: 'Pokemon name' },
    { id: 'id', label: 'ID', minWidth: 35 },
    { id: 'description', label: 'Description', maxWidth: 545 },
    { id: 'powerLevel', label: 'Power Level', minWidth: 120 },
    { id: 'hpLevel', label: 'HP level', minWidth: 120 },
]

const sortOptions: SortOption[] = [
    { label: 'Name A-Z', sortBy: { name: 1 } },
    { label: 'Name Z-A', sortBy: { name: -1 } },
    { label: 'Power (High to low)', sortBy: { power: -1 } },
    { label: 'Power (Low to high)', sortBy: { power: 1 } },
    { label: 'HP (High to low)', sortBy: { hp: -1 } },
    { label: 'HP (Low to high)', sortBy: { hp: 1 } }
]

export const pokemonService = {
    fetchPokemons,
    sortOptions,
    tableColumns
}