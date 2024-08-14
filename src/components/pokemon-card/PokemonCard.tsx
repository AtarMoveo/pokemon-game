import { Dispatch, SetStateAction } from "react";
import { PowerIcon } from "../../assets/svg/svg";
import { BasicPokemon } from "../../data/types/pokemon";
import { StyledPokemonCard } from "./styles";

interface PokemonCardProps {
    pokemon: BasicPokemon
    setSelectedPokemon: Dispatch<SetStateAction<BasicPokemon | null>>
}

export function PokemonCard({ pokemon, setSelectedPokemon }: PokemonCardProps) {
    return <StyledPokemonCard onClick={()=>setSelectedPokemon(pokemon)}>
        <div className="img-container">
            <img src={pokemon.image} alt={`${pokemon.name}-image`} />
            <div className="pokemon-pwr">{pokemon.powerLevel}<span>pwr</span>
            <PowerIcon />
            </div>
        </div>
        <h5 className="pokemon-id">#{pokemon.id}</h5>
        <h3 className="pokemon-name">{pokemon.name}</h3>
    </StyledPokemonCard>
}