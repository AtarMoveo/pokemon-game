import { StyledFight } from "./styles";

export function Fight() {
    return <StyledFight>
        <div className="fight-main-container">
            <h1 className="fight-title">Fighting arena</h1>
            <h2 className="fight-subtitle">Press fight button until your or your enemy power will end</h2>
        </div>
    </StyledFight>
}