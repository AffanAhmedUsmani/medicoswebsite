import React, { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, TextField, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MapDisplay from './MapDisplay'; // Make sure this is used or remove if unnecessary
import backgroundImage from '../static/Logo_1@4x-100.jpg';
import DoctorsComponent from './DoctorComponent';
import HospitalsComponent from './HospitalsComponent';
import PlansComponent from './PlansComponent';
import PlanComparisonComponent from './PlanComparisonComponent';
import AboutUsComponent from './About_us';
import backgroundImage1 from '../static/O9FG4W0.jpg';
function HomePage() {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchType, setSearchType] = useState('hospitals');
  const [comparisonActive, setComparisonActive] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleSearchType = (event, newType) => {
    if (newType !== null) {
      setSearchType(newType);
      
      console.log("Search type set to:", newType);
    }
  };

  const handleSearch = (event) => {
    console.log("Search performed for type:", searchType);
  setSearchPerformed(true); // Ensuring this is set when search is clicked
  setComparisonActive(false);
  // Get the value from the text field
  const enteredText = document.getElementById('zipcode-input').value;
  setSearchText(enteredText);
  console.log("Search performed for zipcode:", enteredText);
  };

  // const handleTextChange = (event) => {
  //   setSearchText(event.target.value); 
  // };

  const handleComparePlans = (plans) => {
    setSelectedPlans(plans);
    setComparisonActive(true);
  };

  return (
    <Box style={{ height: '115vh' ,backgroundImage: `url(${backgroundImage1})`,
    backgroundSize: 'cover',}} >
      <Box
        textAlign="center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing(5)
        }}
      >
        <Typography variant="h3" color="primary.contrastText">
          Find Medical Services Near You
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <ToggleButtonGroup
          color="primary"
          value={searchType}
          exclusive
          onChange={handleSearchType}
          aria-label="Search Type"
          sx={{
            '& .MuiToggleButtonGroup-grouped': {
              margin: theme.spacing(0.5),
              border: 0,
              '&.Mui-selected': {
                backgroundColor: '#070F2B',
                color: '#8CABFF',
                '&:hover': {
                  backgroundColor: '#070F2B',
                },
              },
              '&:not(.Mui-selected)': {
                backgroundColor: '#8CABFF',
                color: '#070F2B',
              },
            },
          }}
        >
          <ToggleButton value="hospitals">Hospitals</ToggleButton>
          <ToggleButton value="doctors">Doctors</ToggleButton>
          <ToggleButton value="plans">Plans</ToggleButton>
        </ToggleButtonGroup>
        <Box mt={2} display="flex" justifyContent="center">
          <TextField
          id="zipcode-input"
            label=""
            variant="outlined"
            placeholder="Enter Zipcode Here"
            sx={{
              width: '90%',
              '& .MuiInputBase-root': {
                color: '#5F85DB',
                backgroundColor: '#353941',
                borderRadius: '50px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5F85DB',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5F85DB',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5F85DB',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ ml: 2, borderRadius: '50px' }}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box >
      {!searchPerformed && (
        <AboutUsComponent />
      )}

       {searchPerformed && !comparisonActive && (
        <Box mt={4}>
          {searchType === 'doctors' && <DoctorsComponent searchText={searchText}/>}
          {searchType === 'hospitals' && <HospitalsComponent searchText={searchText}/>}
          {searchType === 'plans' && <PlansComponent onComparePlans={handleComparePlans} />}
        </Box>
      )}
      
      {comparisonActive && (
        <Box mt={4}>
          <PlanComparisonComponent plans={selectedPlans} onBack={() => setComparisonActive(false)} />
        </Box>
      )}

</Box>

    </Box>
  );
}

export default HomePage;
