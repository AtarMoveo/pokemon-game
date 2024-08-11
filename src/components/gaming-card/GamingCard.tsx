import 'animate.css'

import { colors } from "../../assets/style/setup/constants"
import { BasicPokemon } from "../../data/types/pokemon"
import { StyledGamingCard } from "./styles"


interface GamingCardProps {
    pokemon: BasicPokemon
    isUser: boolean
    cardRef: React.Ref<HTMLDivElement>
}

export function GamingCard({ pokemon, isUser, cardRef }: GamingCardProps) {
    const hpProgressBar = `linear-gradient(to right, 
    ${colors.secondary.green} ${pokemon.currHpLevel / pokemon.hpLevel * 100}%, 
    ${colors.neutrals[150]} ${1 - pokemon.currHpLevel / pokemon.hpLevel * 100}%)`

    return <StyledGamingCard ref={cardRef} className="animate__animated">
        <h3 className="card-title">{isUser ? 'You' : 'Opponent'}</h3>
        <div className="img-container">
            <img src={pokemon.image} alt={`${pokemon.name}-image`} />
            <div className="pokemon-pwr">{pokemon.powerLevel}<span>pwr</span></div>
        </div>
        <h5 className="pokemon-id">#{pokemon.id}</h5>
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="progress-bar" style={{ background: hpProgressBar, transition: '1s' }}></div>
    </StyledGamingCard>
}