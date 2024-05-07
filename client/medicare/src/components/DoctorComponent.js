import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import DoctorDetailComponent from './DoctorDetailComponent';
import { fetchData } from './api';
import MapDisplay from './MapDisplayDoc';

function DoctorComponent({ searchText }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [mapKey, setMapKey] = useState(Date.now()); 
  const doctorsPerPage = 6;

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const endpoint = `api-v1/nearby-doctors/${searchText}/`;
      const data = await fetchData(endpoint);
      setDoctors(data);
    };

    fetchDataFromApi();
  }, [searchText]);

  useEffect(() => {
    setCurrentPage(0);
    setMapKey(Date.now());
  }, [searchText]);

  const indexOfLastDoctor = (currentPage + 1) * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handleDoctorClick = (id) => {
    setSelectedDoctorId(id);
    setShowDetail(true);
  };

  const handleBack = () => {
    setSelectedDoctorId(null);
    setShowDetail(false);
    setMapKey(Date.now());
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const totalPages = Math.ceil(doctors.length / doctorsPerPage) - 1;
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {!showDetail ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '635px'}}>
            <Paper elevation={3} sx={{ height: '600px', width: '100%', bgcolor: 'background.paper' }}>
  <List dense>
    {currentDoctors.map((doctor, index) => (
      <ListItem 
        key={index} 
        button 
        onClick={() => handleDoctorClick(doctor.id)}
        sx={{
          padding: '12px',
          borderBottom: '1px solid #e0e0e0',
          '&:hover': {
            bgcolor: '#f5f5f5'
          }
        }}
      >
        <ListItemText 
          primary={
            <Typography variant="h6" style={{ color: '#1976d2', fontWeight: 'medium' }}>
              {doctor.name}
            </Typography>
          }
          secondary={
            <>
              <Typography variant="subtitle2" color="textPrimary" display="block" gutterBottom>
                Specialty: {doctor.specialties}
              </Typography>
            </>
          }
        />
      </ListItem>
    ))}
  </List>
</Paper>
              <Button onClick={handlePrevious} disabled={currentPage === 0}>Previous</Button>
              <Button onClick={handleNext} disabled={indexOfLastDoctor >= doctors.length}>Next</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ height: '600px', width: '100%' }}>
              <MapDisplay locations={currentDoctors.flatMap(doctor => doctor.locations.map(location => ({
                id: doctor.id,
                lat: location.latitude,
                lng: location.longitude,
                name: doctor.name,
              })))} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <DoctorDetailComponent doctorId={selectedDoctorId} onBack={handleBack} />
      )}
    </Box>
  );
}

export default DoctorComponent;
