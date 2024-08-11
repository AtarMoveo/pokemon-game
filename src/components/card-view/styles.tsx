import styled from "styled-components";

export const StyledCardView = styled.section`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-columns: repeat(auto-fit, minmax(auto, 320px));
    gap: 1.5rem;
    justify-content: center;

    button {
        grid-column: 1/-1;
        justify-self: center;
    }
`