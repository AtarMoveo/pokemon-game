import { PokemonsTable } from "../pokemons-table/PokemonsTable";

import '@aws-amplify/ui-react/styles.css';

interface MyPokemonsProps {
    userId: number | undefined
}

export function MyPokemons({userId}: MyPokemonsProps) {
  
    return (
        <PokemonsTable
            title='My Pokemons'
            userId={userId}
        >
        </PokemonsTable>
    )
}