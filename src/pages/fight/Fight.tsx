import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import 'animate.css'

import { ButtonType, FightBtn } from "../../components/fight-btn/FightBtn";
import { UserMsg } from "../../components/user-msg/UserMsg";
import { GamingCard } from "../../components/gaming-card/GamingCard";
import { FightSearch } from "../../components/fight-search/FightSearch";

import { pokemonService } from "../../services/pokemon.service";
import { utilService } from "../../services/util.service";
import { userService } from "../../services/user.service";

import { BasicPokemon } from "../../data/types/pokemon";

import { StyledFight } from "./styles";

export function Fight() {
    const [userId, setUserId] = useState('123')
    const [userPokemons, setUserPokemons] = useState<BasicPokemon[]>([])
    const [selectedPokemon, setSelectedPokemon] = useState<BasicPokemon>()
    const [opponentPokemon, setOpponentPokemon] = useState<BasicPokemon>()
    const [isGameOn, setIsGameOn] = useState(false)
    const [isFirstAttack, setIsFirstAttack] = useState(true)
    const [isUserTurn, setIsUserTurn] = useState<boolean | null>(null)
    const [userMsg, setUserMsg] = useState<string | null>(null)

    const userCardRef = useRef<HTMLDivElement>(null)
    const opponentCardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        loadUserPokemons()
        loadRandomOpponentPokemon()
    }, [userId])

    useEffect(() => {   // handles opponent's turn
        if (isGameOn && !isUserTurn) {
            const timeoutId = setTimeout(() => {
                if (selectedPokemon!.currHpLevel <= 0) return onUserLose()
                const attackPower = opponentPokemon!.powerLevel * utilService.getRandomAttackFactor()

                setSelectedPokemon((prevPokemon) => {
                    const card = userCardRef.current
                    if (card) {
                        card.classList.remove('animate__flash') // Remove the class to reset animation
                        void card.offsetWidth // Trigger reflow to restart the animation
                        card.classList.add('animate__flash')
                    }
                    const pokemon = prevPokemon as BasicPokemon
                    const updatedHp = pokemon.currHpLevel - attackPower
                    return { ...pokemon, currHpLevel: updatedHp > 0 ? updatedHp : 0 }
                })
                setIsUserTurn(true)
            }, 1500)
            return () => clearTimeout(timeoutId)
        }
    }, [isUserTurn])

    async function loadUserPokemons() {
        try {
            const pokemons = await pokemonService.fetchMyPokemons(userId)
            setUserPokemons(pokemons)
            setSelectedPokemon(pokemons[0])
        } catch (err) {
            console.error(err)
        }
    }

    async function loadRandomOpponentPokemon() {
        try {
            const pokemon = await pokemonService.fetchRandomPokemon(userId)
            setOpponentPokemon(pokemon[0])
        } catch (err) {
            console.error(err)
        }
    }

    function onFight() {
        setIsGameOn(true)
        if (selectedPokemon!.speed >= opponentPokemon!.speed) {   // determines who starts 
            setIsUserTurn(true)
        } else {
            setIsUserTurn(false)
        }
    }

    function onAttack() {
        setIsFirstAttack(false)
        const attackPower = selectedPokemon!.powerLevel * utilService.getRandomAttackFactor()
        setOpponentPokemon((prevPokemon) => {
            const card = opponentCardRef.current
            if (card) {
                card.classList.remove('animate__flash') // Remove the class to reset animation
                void card.offsetWidth // Trigger reflow to restart the animation
                card.classList.add('animate__flash')
            }
            const pokemon = prevPokemon as BasicPokemon
            const updatedHp = pokemon.currHpLevel - attackPower
            return { ...pokemon, currHpLevel: updatedHp > 0 ? updatedHp : 0 }
        })
        setIsUserTurn(false)
    }

    function onCatch() {
        const catchRate = (opponentPokemon?.currHpLevel! < 0.2 * opponentPokemon?.hpLevel!) ? 0.4 : 0.2
        const isCaught = Math.random() < catchRate
        if (isCaught) {
            const card = opponentCardRef.current
            if (card) {
                card.classList.remove('animate__zoomOutLeft'); // Remove the class to reset animation
                void card.offsetWidth; // Trigger reflow to restart the animation
                card.classList.add('animate__zoomOutLeft')
            }
            userService.addUserPokemon(userId, opponentPokemon!.id)
            setUserPokemons(prevPokemons => [...prevPokemons, opponentPokemon!])
            setUserMsg(`Congratulations! You caught ${opponentPokemon!.name}`)
        } else {
            setIsUserTurn(false)
        }
    }

    function onUserLose() {
        const card = userCardRef.current
        if (card) {
            card.classList.remove('animate__zoomOutRight') // Remove the class to reset animation
            void card.offsetWidth // Trigger reflow to restart the animation
            card.classList.add('animate__zoomOutRight')
        }
        userService.removeUserPokemon(userId, selectedPokemon!.id)
        setUserPokemons(prevPokemons => prevPokemons.filter(pokemon => pokemon.id !== selectedPokemon!.id))
        setUserMsg(`You lost.\n${selectedPokemon!.name} was caught!`)
    }

    function onRestart() {
        setIsGameOn(false)
        setIsFirstAttack(true)
        setUserMsg(null)
        setIsUserTurn(null)
        setSelectedPokemon(userPokemons[1])
        loadRandomOpponentPokemon()
        activateAnimations()
    }

    function activateAnimations() {
        const userCard = userCardRef.current
        if (userCard) {
            userCard.classList.remove('animate__zoomOutRight')
            void userCard.offsetWidth
            userCard.classList.add('animate__zoomIn')
        }
        const opponentCard = opponentCardRef.current
        if (opponentCard) {
            opponentCard.classList.remove('animate__zoomOutLeft')
            void opponentCard.offsetWidth
            opponentCard.classList.add('animate__zoomIn')
        }
    }


    if (!selectedPokemon || !opponentPokemon) return <div>Loading...</div>
    return <StyledFight>
        <div className="fight-main-container">
            <h1 className="fight-title">Fighting arena</h1>
            <h2 className="fight-subtitle">Press fight button until your or your enemy power ends</h2>
            <FightSearch options={userPokemons}
                selectedPokemon={selectedPokemon}
                setSelectedPokemon={setSelectedPokemon as Dispatch<SetStateAction<BasicPokemon>>}
                isDisabled={isGameOn}>
            </FightSearch>
            <div className="cards-container">
                {selectedPokemon && <GamingCard cardRef={userCardRef} pokemon={selectedPokemon} isUser={true}></GamingCard>}
                <div className="btn-container">
                    {!isGameOn && <FightBtn type={ButtonType.Fight} onClick={onFight}>Fight</FightBtn>}
                    {isGameOn && <FightBtn type={ButtonType.Action} isDisabled={!isUserTurn} onClick={onAttack}>Attack</FightBtn>}
                    {isGameOn && <FightBtn type={ButtonType.Action} isDisabled={isFirstAttack} onClick={onCatch}>Catch</FightBtn>}
                </div>
                {opponentPokemon && <GamingCard cardRef={opponentCardRef} pokemon={opponentPokemon} isUser={false}></GamingCard>}
                {userMsg && <UserMsg msg={userMsg} onRestart={onRestart}></UserMsg>}
            </div>
        </div>
    </StyledFight>
}