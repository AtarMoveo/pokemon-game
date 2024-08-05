import { useState } from "react"
import styled from "styled-components"

import { colors, font } from "../../../assets/style/setup/constants"
import { SearchIcon, XIcon } from "../../../assets/svg/svg"


interface SearchBarProps {
    onChange: (value: string) => void,
    placeholder?: string
    isFiltered?: boolean
}

const StyledInputWrapper = styled.div<{ value: string, isFiltered: boolean }>`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.5rem;
    
    width: 17rem;

    padding: 0.5rem 0.75rem;
    border: 1px solid ${(props) => (props.value ? colors.neutrals[500] : colors.neutrals[200])};
    border-color: ${(props) => (props.isFiltered ? colors.neutrals[200] : '')};
    border-radius: 8px;

    &:hover {
        border-color: ${colors.neutrals[250]};
        ::placeholder {
            color: ${colors.neutrals[400]};
        };
        svg {
            color: ${colors.neutrals[400]};
        }
    }

    &:active {
        border-color: ${colors.neutrals[500]};
        ::placeholder {
            color: ${colors.neutrals[500]};
        };
        svg {
            color: ${colors.neutrals[500]};
        }
    }

    &:disabled {
        border: none;
    }

    input {
    border: none;
    outline-style: none;
    font-size: 0.875rem;
    line-height: 1.375rem;
    padding: 0;
    background: transparent;
}

    ::placeholder {
        color: ${colors.neutrals[250]};
        font-family: ${font.secondary.regular};
    }

    svg {
        color: ${(props) => props.value ? colors.neutrals[500] : colors.neutrals[250]}
    }

    .clean-btn {
        display: flex;
        place-items: center;
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
    }
`

export const SearchBar = ({ onChange, placeholder = 'Search', isFiltered = false }: SearchBarProps) => {
    const [value, setValue] = useState<string>('');

    function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const newValue = ev.target.value
        setValue(newValue)
        onChange(newValue)
    }

    console.log(value)
    return <StyledInputWrapper value={value} isFiltered={isFiltered}>
        <SearchIcon></SearchIcon>
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
        {isFiltered && <button className="clean-btn" onClick={() => {
            (setValue('')); onChange('')
        }}>
            <XIcon></XIcon>
        </button>
        }
    </StyledInputWrapper>
}