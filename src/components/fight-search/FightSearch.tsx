import { Dispatch, SetStateAction } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';

import { BasicPokemon } from '../../data/types/pokemon';
import { font } from '../../assets/style/setup/constants';
import { StyledImg, textFieldStyles, listboxStyles } from './styles';

interface FightSearchProps {
  options: BasicPokemon[]
  selectedPokemon: BasicPokemon
  setSelectedPokemon: Dispatch<SetStateAction<BasicPokemon>>
  isDisabled?: boolean
}

export function FightSearch({ options, selectedPokemon, setSelectedPokemon, isDisabled }: FightSearchProps) {
  function handlePokemonSelect(pokemon: BasicPokemon) {
    setSelectedPokemon(pokemon)
  }

  return (
    <Autocomplete
      disableClearable
      disabled={isDisabled}
      options={options}
      getOptionLabel={(option) => option.name}
      value={selectedPokemon}
      onChange={(event, newValue) => handlePokemonSelect(newValue!)}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <StyledImg src={option.thumbnail} alt={option.name} />
          <span style={{ flexGrow: 1 }}>{option.name}</span>
          <div>
            <span style={{ fontFamily: font.primary.bold }}>{option.powerLevel}</span>
            <span>px</span>
          </div>
        </Box>
      )}
      renderInput={(params) => <TextField {...params} placeholder="Choose a Pokémon" size="small" />}
      sx={textFieldStyles}
      ListboxProps={{
        sx: listboxStyles,
      }}
    />
  )
}