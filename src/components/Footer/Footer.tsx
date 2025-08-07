import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        mt: 'auto',
        py: 2,
        px: 2,
        textAlign: 'center',
        backgroundColor: '#e6e6e6',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2025 Poke-roster. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
