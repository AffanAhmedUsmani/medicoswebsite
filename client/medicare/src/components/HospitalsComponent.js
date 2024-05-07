import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import MapDisplay from './MapDisplay';
import { fetchData } from './api';
import HospitalDetailComponent from './HospitalDetailComponent'; // Import the detail component

function HospitalsComponent({ searchText }) {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [showDetail, setShowDetail] = useState(false); 
  const [currentPage, setCurrentPage] = useState(0);
  const hospitalsPerPage = 5;

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const endpoint = `api-v1/nearby-hospitals/${searchText}/`;
      const data = await fetchData(endpoint);
      setHospitals(data);
    };

    fetchDataFromApi();
  }, [searchText]);

  const indexOfLastHospital = (currentPage + 1) * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = hospitals.slice(indexOfFirstHospital, indexOfLastHospital);

  const handleHospitalClick = (id) => {
    setSelectedHospitalId(id);
    setShowDetail(true); 
  };

  const handleBack = () => {
    setSelectedHospitalId(null);
    setShowDetail(false); 
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {!showDetail ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '635px' }}>
            <Paper elevation={3} sx={{ height: '600px', width: '100%' }}>
                <List dense>
                  {currentHospitals.map(hospital => (
                    <ListItem key={hospital.id} button onClick={() => handleHospitalClick(hospital.id)} sx={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" style={{ color: '#1976d2' }}>{hospital.name}</Typography>
                        } 
                        secondary={
                          <>
                            <Typography variant="subtitle1" color="textPrimary" component="span">
                              Type: {hospital.hospital_types}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="div" style={{ marginTop: '4px' }}>
                              Address: {hospital.address}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>Previous</Button>
              <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastHospital >= hospitals.length}>Next</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ height: '600px', width: '100%' }}>
              <MapDisplay  locations={currentHospitals.map(hospital => ({
                id: hospital.id,
                lat: hospital.latitude,
                lng: hospital.longitude,
                name: hospital.name,
                provider_number: hospital.provider_number
              }))} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <HospitalDetailComponent hospitalId={selectedHospitalId} onBack={handleBack} />
      )}
    </Box>
  );
}

export default HospitalsComponent;
