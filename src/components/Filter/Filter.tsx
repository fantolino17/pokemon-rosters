import { Autocomplete, TextField, FormControl } from '@mui/material';
import type { Option } from '../../types';

const Filter = ({
  options = [],
  onChange = () => {},
  filterLabel,
  freeSolo = false,
  noOptionsText,
  style = {},
}: {
  options: Option[],
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