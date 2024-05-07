import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, Button, Chip } from '@mui/material';
import { fetchData } from './api';

function HospitalDetailComponent({ hospitalId, onBack }) {
  const [hospitalDetails, setHospitalDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchData(`api-v1/hospital-detail/${hospitalId}`);
        setHospitalDetails(data);
      } catch (error) {
        console.error('Failed to fetch hospital details:', error);
      }
    };

    fetchDetails();
  }, [hospitalId]);

  // Function to render quality chips
  const renderQualities = (qualities) => {
    if (!qualities) return null;
    return qualities.split(',').map((quality, index) => (
      <Chip key={index} label={quality.trim()} variant="outlined" sx={{ mr: 0.5, mt: 0.5 }} />
    ));
  };

  return (
    <Paper elevation={6} sx={{
      padding: 4,
      margin: { xs: 1, sm: 3 },
      bgcolor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <Button variant="contained" color="secondary" onClick={onBack} sx={{ mb: 3 }}>Back to List</Button>
      {hospitalDetails ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ borderRight: { md: '1px solid #e0e0e0' } }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
              {hospitalDetails.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              {hospitalDetails.description}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mt: 1 }}>
              <strong>Type:</strong> {hospitalDetails.hospital_types}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone Number:</strong> {hospitalDetails.provider_number}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
              <strong>Address:</strong> {hospitalDetails.address}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom color="secondary" sx={{ fontWeight: 'medium' }}>
              Qualities
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: '4px' }}>
              {renderQualities(hospitalDetails.qualities)}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="subtitle1" sx={{ textAlign: 'center', my: 5 }}>Loading...</Typography>
      )}
    </Paper>
    
  );
}

export default HospitalDetailComponent;
