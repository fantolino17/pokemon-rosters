import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '48px' }}>
      Sorry the page you're looking for does not exist. &nbsp;
      <Link to="/rosters">
        Click here to view Pokemon rosters
      </Link>
    </Box>
  )
};

export default PageNotFound;