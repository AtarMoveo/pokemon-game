import { Pokemon, SortBy, SortOption, SortLabel } from "../data/types/pokemon";
import { PokemonType, typeAdvantages } from "../data/types/pokemon-types";
import { httpService } from "./http.service";

async function fetchPokemons(filterBy?: string, sortBy?: SortBy | null, page = 0, rowsPerPage = 10, userId?: number) {
    try {
        const pokemons = await httpService.get<{ rows: Pokemon[], total: number }>('pokemon', {
            filterBy,
            sortBy,
            page,
            rowsPerPage,
            userId
        });
        return pokemons
    } catch (err) {
        console.error('Error fetching pokemons:', err)
        throw err
    }
}

async function fetchMyPokemons(userId: number) {
    try {
        const pokemons = await httpService.get<Pokemon[]>(`user-pokemons/${userId}`)
        return pokemons
    } catch (err) {
        console.error('Error fetching user pokemons:', err)
        throw err
    }
}


async function fetchRandomPokemon(userId: number) {   // opponent pokemon 
    try {
        const pokemon = await httpService.get<Pokemon>(`pokemon/random/${userId}`)
        return pokemon
    } catch (err) {
        console.error('Error fetching random Pokemon:', err);
        throw new Error('Failed to fetch random Pokemon');
    }
}

function isTypeAdvantage(pokemon1: Pokemon, pokemon2: Pokemon): boolean {
    return pokemon1.type.some(type1 =>
        pokemon2.type.some(type2 =>
            typeAdvantages[type1 as PokemonType].includes(type2 as PokemonType)
        )
    )
}

const tableColumns = [
    { id: 'thumbnail', label: '', minWidth: 35 },
    { id: 'name', label: 'Pokemon name', minWidth: 150 },
    { id: 'id', label: 'ID', minWidth: 35 },
    { id: 'description', label: 'Description', maxWidth: 545 },
    { id: 'powerLevel', label: 'Power Level', minWidth: 120 },
    { id: 'hpLevel', label: 'HP level', minWidth: 120 },
]

const sortOptions: SortOption[] = [
    { label: SortLabel.NameAsc, sortBy: { name: 1 } },
    { label: SortLabel.NameDesc, sortBy: { name: -1 } },
    { label: SortLabel.PowerAsc, sortBy: { power: 1 } },
    { label: SortLabel.PowerDesc, sortBy: { power: -1 } },
    { label: SortLabel.HPAsc, sortBy: { hp: 1 } },
    { label: SortLabel.HPDesc, sortBy: { hp: -1 } },
]

export const pokemonService = {
    fetchPokemons,
    fetchMyPokemons,
    fetchRandomPokemon,
    isTypeAdvantage,
    sortOptions,
    tableColumns,
}