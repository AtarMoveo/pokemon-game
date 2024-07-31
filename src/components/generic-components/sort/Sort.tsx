import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { colors, font, textStyle } from "../../../assets/style/setup/constants";
import { ArrowDown } from "../../../assets/svg/svg";

interface SortProps {
  options: string[]
}

export function Sort({ options }: SortProps) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Autocomplete
      disablePortal
      options={options}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      renderInput={(params) => <TextField {...params} placeholder="Sort by" size="small" />}
      popupIcon={<ArrowDown />}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '2.375rem', borderRadius: '8px',
          '& fieldset': {
            borderColor: value ? colors.primary[100] : colors.neutrals[200], // Default border color
            backgroundColor: value ? colors.primary[50] : 'transparent',
            outline: 'none',
            zIndex: '-1'
          },
          '&:hover fieldset': {
            borderColor: value ? colors.neutrals[300] : '',
          },
          '&.Mui-focused fieldset': {
            borderColor: value ? colors.primary[100] : colors.neutrals[200],
            borderWidth: '1px'
          },
          '&.MuiInputBase-sizeSmall': {
            fontSize: '14px', lineHeight: '22px', padding: '8px 12px 8px 12px',
            '.MuiAutocomplete-input': { padding: '0' },
          },
        },
        '& .MuiInputBase-input': {
          color: colors.primary[300],
          opacity: 1,
          '&::placeholder': {
            color: colors.neutrals[400],
            opacity: 1,
          },

        },
        '& svg': {
          color: value ? colors.primary[300] : colors.neutrals[400]
        }
      }}
      ListboxProps={{
        sx: {
          '& .MuiAutocomplete-option': {
            color: colors.neutrals[500], // Change the text color of the options
            fontFamily: font.primary.regular,
            ...textStyle.body,
            '&.Mui-focused': {
              backgroundColor: colors.neutrals[100], // Change the background color when focused
            },
          },
        },
      }}
    />
  )
}