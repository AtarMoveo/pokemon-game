import styled from "styled-components";
import { colors, font, textStyle } from "../assets/style/setup/constants";
import { layout } from "../assets/style/basics/layout";

export const StyledPage = styled.section`
    ${layout.main}
    font-family: ${font.primary.regular};
    
    .main-container {
        grid-column: 2;
        padding-block: 1rem 2.375rem;
        
        .main-header {
            ${textStyle.largeHeading}
            color: ${colors.neutrals[400]}
        }
    }
`