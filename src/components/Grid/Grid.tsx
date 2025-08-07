import {
	Grid as MUIGrid,
  CircularProgress,
  Typography,
} from '@mui/material';
import { capitalize } from '../../utils/utils';
import { Card } from "../Card/Card";

// TODO: Maybe refactor to be more generic with  "title", "subtitle", "imageUrl"
// GridItem instead of Pokemon

const Grid = ({
  itemList = [],
  selectedItems = [],
  onSelect,
  isLoading = false,
  style,
}: {
  itemList: Pokemon[],
  selectedItems: Pokemon[],
  onSelect: (pokemon: Pokemon) => void,
  isLoading: boolean,
  style: {},
}) => {
  return (
    <MUIGrid
      container
      spacing={2}
      sx={{
        justifyContent: 'center',
        overflow: 'auto',
        maxHeight: '35vh',
        padding: '10px',
        ...style
      }}
    >
      {isLoading && <CircularProgress sx={{ alignSelf: 'center' }}/>}
      {!isLoading && !itemList.length && <Typography>No items found!</Typography>}
      {!isLoading && itemList.map(({ id, name, types = [], imageUrl }: Pokemon) => {
        const selected = !!selectedItems.some((selectedItem: Pokemon) => selectedItem.id === id);
        return (
          <MUIGrid
            key={id}
            onClick={() => onSelect({ id, name, types, imageUrl })}
            sx={{
              cursor: selected ? 'not-allowed' : 'pointer',
              border: selected ? '2px solid #1976d2' : '2px solid #a1a1a1',
              borderRadius: 1,
              boxShadow: selected ? 6 : 1,
              opacity: selected ? '.4' : '1', 
              transition: 'all 0.2s ease',
              height: 'fit-content',
              '&:hover': {
                transform: 'scale(1.02)',
                border: selected ? '2px solid #1976d2' : '2px solid #d2c419',
                boxShadow: selected ? 8 : 3,
              },
            }}
          >
            <Card
              key={id}
              title={capitalize(name)}
              subtitles={types.map((type: string) => capitalize(type))}
              imageUrl={imageUrl}
            />
          </MUIGrid>
        )}
      )}
    </MUIGrid>
  );
};

export default Grid;