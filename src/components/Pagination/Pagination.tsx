import { FormControl, Box, Button, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';

const Pagination = ({
  onPageChange,
  onPageSizeChange,
  page = 1,
  pageSize = 20,
  maxPage,
}: {
  onPageChange: (page: number) => void,
  onPageSizeChange: (page: number) => void,
  page: number,
  pageSize: number,
  maxPage: number,
}) => {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', margin: '8px', width: '100%' }}>
      <Box sx={{ flex: 2, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button disabled={page <= 0} onClick={() => onPageChange(page-1)} sx={{ marginRight: '4px' }}>
          Previous
        </Button>
        <Typography>Page: {page+1}</Typography>
        <Button disabled={page >= maxPage} onClick={() => onPageChange(page+1)} sx={{ marginLeft: '4px' }}>
          Next
        </Button>
      </Box>

      <FormControl sx={{  flex: .25 }}>
        <InputLabel id="dropdown-label">Page Size</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={pageSize}
          label="Page size"
          onChange={(e): Event => onPageSizeChange(e?.target?.value || 20)}
          MenuProps={{
            anchorOrigin: {
              vertical: 'top',
            },
            transformOrigin: {
              vertical: 'bottom',
            },
          }}
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

export default Pagination;