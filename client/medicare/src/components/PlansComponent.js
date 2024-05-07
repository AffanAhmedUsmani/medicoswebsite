import React, { useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, Button, Box, Paper } from '@mui/material';

const mockPlans = [
  { id: 1, name: 'Basic Health Plan', description: 'This is a basic health plan.' },
  { id: 2, name: 'Premium Health Plan', description: 'This is a premium health plan with extra benefits.' },
  { id: 3, name: 'Family Health Plan', description: 'This plan offers coverage for the entire family.' },
];

function PlansComponent({ onComparePlans }) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      if (newChecked.length <= 2) {
        setChecked(newChecked);
      }
    } else {
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    }
  };

  return (
    <Box>
      <Paper elevation={3}>
        <List dense>
          {mockPlans.map((plan) => (
            <ListItem key={plan.id} secondaryAction={
              <Checkbox
                onChange={handleToggle(plan.id)}
                checked={checked.includes(plan.id)}
                disabled={checked.length >= 2 && !checked.includes(plan.id)}
              />
            }>
              <ListItemText primary={plan.name} secondary={plan.description} />
            </ListItem>
          ))}
        </List>
        {checked.length === 2 && (
          <Box display="flex" justifyContent="center" p={2}>
            <Button variant="contained" color="primary" onClick={() => onComparePlans(checked.map(id => mockPlans.find(p => p.id === id)))}>
              Compare Plans
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default PlansComponent;
