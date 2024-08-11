import { Dispatch, SetStateAction, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ArrowDown } from "../../../assets/svg/svg";
import { SortOption, SortBy } from '../../../data/types/pokemon';
import { autocompleteStyles, listboxStyles } from './styles';

interface SortProps {
  options: SortOption[]
  setSortBy: Dispatch<SetStateAction<SortBy | null>>
}

export function Sort({ options, setSortBy }: SortProps) {
  const [value, setValue] = useState<SortOption | null>(null);

  function handleSortBy(option: SortOption) {
    setValue(option)
    setSortBy(option?.sortBy)
  }

  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.sortBy === value.sortBy}
      value={value}
      onChange={(event, newValue) => handleSortBy(newValue!)}
      renderInput={(params) => <TextField {...params} placeholder="Sort by" size="small" />}
      popupIcon={<ArrowDown />}
      sx={autocompleteStyles(value)}
      ListboxProps={{
        sx: listboxStyles
      }}
    />
  )
}