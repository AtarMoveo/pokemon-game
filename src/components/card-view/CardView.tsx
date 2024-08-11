import { Dispatch, SetStateAction } from "react"
import { BasicPokemon } from "../../data/types/pokemon"
import { Popup } from "../generic-components/popup/Popup"
import { PokemonCard } from "../pokemon-card/PokemonCard"
import { StyledCardView } from "./styles"
import { Button } from "../generic-components/button/Button"

interface CardViewProps {
    pokemons: BasicPokemon[]
    selectedPokemon: BasicPokemon | null
    setSelectedPokemon: Dispatch<SetStateAction<BasicPokemon | null>>
    setRowsPerPage: Dispatch<SetStateAction<number>>
    rowsPerPage: number
    totalRows: number
}

export function CardView({ pokemons, selectedPokemon, setSelectedPokemon, setRowsPerPage, 
    totalRows, rowsPerPage }: CardViewProps) {
    function loadMorePokemons() {
        setRowsPerPage(prevRows => prevRows + 12)
      }

    return <StyledCardView>
        {pokemons.map((pokemon) => {
            return <PokemonCard pokemon={pokemon} setSelectedPokemon={setSelectedPokemon}></PokemonCard>
        })}
        <Popup selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon}></Popup>
        {totalRows > rowsPerPage && <Button type="primary" size="md" onClick={loadMorePokemons}>Load more</Button>}
    </StyledCardView>
}