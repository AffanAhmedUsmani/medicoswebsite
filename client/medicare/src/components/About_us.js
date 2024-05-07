import React from 'react';
import { Box, Typography, Button, Grid, Container, useMediaQuery, useTheme } from '@mui/material';
import backgroundImage from '../static/O9FG4W0.jpg'; // Replace with your actual background image path
import healthcareImage from '../static/health-care.png'; // Replace with your actual round image path

const AboutUsComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{
      position: 'relative',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center" direction={isMobile ? 'column-reverse' : 'row'}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              ABOUT US
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
              Streamlining Healthcare Access
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              In today's digital era, immediate access to healthcare information is not just a convenience—it's a necessity. Our mission is to transform healthcare data accessibility, making it as straightforward and user-friendly as possible. We're committed to ensuring that vital health information is at your fingertips, just a few clicks away. We understand the importance of swift and reliable healthcare data, and we're dedicated to providing that service, whether you're at home, at work, or on the go.
            </Typography>
           
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box component="img" src={healthcareImage} alt="Health Care" sx={{
              width: isMobile ? '100%' : '400px', // Full width on mobile, fixed width on desktop
              height: isMobile ? 'auto' : '400px', // Auto height on mobile, fixed height on desktop
              borderRadius: isMobile ? '50%':'10%', // Circular image
              position: isMobile ? 'relative' : 'absolute', // Relative position on mobile, absolute on desktop
              top: isMobile ? 'auto' : '20%', // Top aligned on desktop
              transform: isMobile ? 'none' : 'translateY(-15%)', // No transform on mobile, vertical centering on desktop
              right: isMobile ? 'auto' : '15%', // Right aligned on desktop
              zIndex: 2, // Ensure it's above the background
            }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsComponent;
