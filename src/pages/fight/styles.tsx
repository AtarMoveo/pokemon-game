import styled from "styled-components";
import { layout } from "../../assets/style/basics/layout";
import { colors, font } from "../../assets/style/setup/constants";

export const StyledFight = styled.main`
    ${layout.main}
    padding-block: 2.5rem;
    
    .fight-main-container {
        grid-column: 2;
        text-align: center;

        .fight-title {
            font-family: ${font.primary.bold};
            font-size: 2.5rem;
            line-height: 2.6875rem;
            color: ${colors.neutrals[400]};
            margin-bottom: 0.5rem;
        }

        .fight-subtitle {
            font-family: ${font.primary.regular};
            font-size: 1.125rem;
            line-height: 1.375rem;
            color: ${colors.neutrals[400]};
        }
    }
`