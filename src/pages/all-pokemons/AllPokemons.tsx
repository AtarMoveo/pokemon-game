import { useEffect, useState } from "react";
import { PokemonsTable } from "../pokemons-table/PokemonsTable";
import { pokemonService } from "../../services/pokemon.service";

export function AllPokemons() {
    const [userPokemonsIds, setUserPokemonsIds] = useState<number[]>([])
    const [userId, setUserId] = useState(1)

    useEffect(() => {
        loadUserPokemons()
    }, [])

    async function loadUserPokemons() {
        try {
            const pokemonsIds = await pokemonService.fetchUserPokemonsIds(userId)
            setUserPokemonsIds(pokemonsIds)
        } catch (err) {
            console.error('Failed to get user Pokemons ids')
        }
    }

    return <PokemonsTable
        title='All Pokemons'
        userPokemonsIds={userPokemonsIds}
    >
    </PokemonsTable>
}