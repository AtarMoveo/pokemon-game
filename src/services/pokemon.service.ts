import { BasicPokemon } from "../data/types/pokemon";

export const pokemonService = {
    fetchPokemons
}

async function fetchPokemons(page: number, rowsPerPage: number): Promise<{ rows: BasicPokemon[], total: number }> {
    const response = await fetch('/data/pokemon.json')
    const data = await response.json()
    const startIndex = page * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginatedData = data.slice(startIndex, endIndex)
    const pokemons = convertDate(paginatedData)
    return { rows: pokemons, total: data.length }
}

function convertDate(pokemons: any): BasicPokemon[] {
    return pokemons.map((pokemon: any): BasicPokemon => {
        return {
            image: pokemon.image.thumbnail,
            name: pokemon.name.english,
            id: pokemon.id,
            description: pokemon.description,
            powerLevel: pokemon.base.HP,
            hpLevel: pokemon.base.HP
        }
    })
}