import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box mt={8} py={4} bgcolor="lightgrey">
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          Medical Search © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
