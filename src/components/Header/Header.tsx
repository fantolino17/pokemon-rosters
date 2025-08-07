import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import pokeballImg from '../../assets/pokeball.png';

const Header = () => {
  return (
    <header style={{ position: 'sticky', top: 0 }}>
      <Box>
        <AppBar position="static" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
              Poké-roster
            </Typography>

            <Box  sx={{ justifySelf: 'center' }}>
              <Button color="inherit" component={Link} to={PATHS.LIST.value}>
                {PATHS.LIST.label}
              </Button>
              <Button color="inherit" component={Link} to={PATHS.CREATE.value}>
                {PATHS.CREATE.label}
              </Button>
            </Box>

            <img src={pokeballImg} height={40} width={40}/>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}

export default Header;