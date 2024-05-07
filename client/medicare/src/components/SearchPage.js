import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

function SearchPage() {
  const [zipCode, setZipCode] = useState('');
  const [data, setData] = useState(null);

  const mockData = {
    hospitals: [
      { id: 1, name: "General Hospital", address: "123 Main St" },
      { id: 2, name: "City Hospital", address: "456 Side St" }
    ],
    physicians: [
      { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
      { id: 2, name: "Dr. Jones", specialty: "Pediatrics" }
    ]
  };

  const handleSearch = () => {
    // For now, we just log the data and set it to state
    console.log(`Data for zip code ${zipCode}:`, mockData);
    setData(mockData);
  };

  return (
    <div>
      <TextField
        label="Enter Zip Code"
        variant="outlined"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <Button onClick={handleSearch} variant="contained">Search</Button>
      {data && (
        <div>
          <Typography variant="h6" style={{ marginTop: 20 }}>Hospitals</Typography>
          {data.hospitals.map((hospital) => (
            <Card key={hospital.id} style={{ margin: 10 }}>
              <CardContent>
                <Typography variant="h5">{hospital.name}</Typography>
                <Typography variant="body1">{hospital.address}</Typography>
              </CardContent>
            </Card>
          ))}
          <Typography variant="h6">Physicians</Typography>
          {data.physicians.map((physician) => (
            <Card key={physician.id} style={{ margin: 10 }}>
              <CardContent>
                <Typography variant="h5">{physician.name}</Typography>
                <Typography variant="body1">{physician.specialty}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
