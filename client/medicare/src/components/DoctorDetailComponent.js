import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Paper, Button, Chip } from '@mui/material';
import { fetchData } from './api';

function DoctorDetailComponent({ doctorId, onBack }) {
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchData(`api-v1/doctor-detail/${doctorId}`);
        setDoctorDetails(data);
      } catch (error) {
        console.error('Failed to fetch doctor details:', error);
      }
    };

    fetchDetails();
  }, [doctorId]);

  return (
    <Paper elevation={6} sx={{
      padding: { xs: 2, sm: 3 },
      margin: 3,
      bgcolor: 'background.default',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
    }}>
      <Button variant="contained" color="primary" onClick={onBack} sx={{ mb: 3 }}>Back to List</Button>
      {doctorDetails ? (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom color="secondary" sx={{ fontWeight: 'bold' }}>
              {doctorDetails.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              <strong>Specialties:</strong> {doctorDetails.specialties}
            </Typography>
            {doctorDetails.educations && (
              <Typography variant="body1" gutterBottom>
                <strong>Education:</strong> {doctorDetails.educations}
              </Typography>
            )}
            {doctorDetails.genders && (
              <Typography variant="body1" gutterBottom>
                <strong>Gender:</strong> {doctorDetails.genders}
              </Typography>
            )}
            {doctorDetails.consultation && (
              <Typography variant="body1" gutterBottom>
                <strong>Consultation:</strong> {doctorDetails.consultation}
              </Typography>
            )}
            {doctorDetails.zipcode && (
              <Typography variant="body1" gutterBottom>
                <strong>Zip Code:</strong> {doctorDetails.zipcode}
              </Typography>
            )}
            {doctorDetails.addresses && doctorDetails.addresses.length > 0 && (
              <Box mt={2} sx={{ p: 1, bgcolor: 'grey.100', borderRadius: '4px' }}>
                <Typography variant="h6" gutterBottom color="info.main">Addresses:</Typography>
                {doctorDetails.addresses.map((address, index) => (
                  address && address.address_line && address.address_line !== "null" && (
                    <Chip key={index} label={address.address_line} variant="outlined" sx={{ mr: 1, mt: 1, bgcolor: 'background.paper' }} />
                  )
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {doctorDetails.phone_numbers && doctorDetails.phone_numbers.length > 0 && (
              <Box mt={2} sx={{ p: 1, bgcolor: 'grey.200', borderRadius: '4px' }}>
                <Typography variant="h6" gutterBottom color="info.main">Phone Numbers:</Typography>
                {doctorDetails.phone_numbers.map((phone, index) => (
                  phone && phone.number && phone.number !== "null" && (
                    <Chip key={index} label={phone.number} variant="outlined" sx={{ mr: 1, mt: 1, bgcolor: 'background.paper' }} />
                  )
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      ) : (
        <Typography variant="subtitle1" sx={{ textAlign: 'center', my: 5, color: 'text.secondary' }}>Loading...</Typography>
      )}
    </Paper>
    
  );
}

export default DoctorDetailComponent;
