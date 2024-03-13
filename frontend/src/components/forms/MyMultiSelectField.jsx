import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Controller } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MyMultiSelectField(props) {
  const theme = useTheme();
  const { control, name, label, options } = props;
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`select-${name}-label`}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Select
              labelId={`select-${name}-label`}
              id={`select-${name}`}
              multiple
              value={value}
              onChange={(e) => {
                handleChange(e);
                onChange(e.target.value);
              }}
              input={<OutlinedInput id={`select-${name}`} label={label} />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                     <Chip
                     key={value}
                     label={options.find(option => option.id === value)?.name}
                   />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  style={getStyles(option.name, personName, theme)}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </div>
  );
}
