import { useState } from "react";
import { PokemonsTable } from "../pokemons-table/PokemonsTable";

export function MyPokemons() {
    const [userId, setUserId] = useState('123')

    return <PokemonsTable
        title='My Pokemons'
        userId={userId}>
    </PokemonsTable>
}