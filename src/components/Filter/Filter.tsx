import { Autocomplete, TextField, FormControl, Box, Button, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { capitalize } from '../../utils/utils';


const Filter = ({
  options = [],
  onChange = () => {},
  filterLabel,
  freeSolo = false,
  noOptionsText,
  style = {},
}: {
  options: { value: string, label: string }[],
  onChange: (value: any) => void,
  filterLabel: string,
  freeSolo: boolean,
  noOptionsText: string,
  style: {},
}) => (
  <FormControl sx={{ flex: 1 }} size='small'>
    <Autocomplete
      autoComplete
      id={`${filterLabel}-select`}
      freeSolo={freeSolo}
      options={options}
      onChange={(_, value, reason) => reason === 'clear' ? onChange('') : onChange(value)}
      renderInput={(params) => <TextField {...params} label={filterLabel} />}
      noOptionsText={noOptionsText}
      sx={{ width: '50%', ...style }}
      size='small'
    />
  </FormControl>
);

export default Filter;