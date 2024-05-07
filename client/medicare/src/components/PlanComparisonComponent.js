import React from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';

function PlanComparisonComponent({ plans, onBack }) {
  if (!plans || plans.length !== 2) {
    console.error("Expected two plans for comparison, received:", plans);
    return <Typography>Error: Incorrect data passed to comparison view.</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" p={1}>
        <Button onClick={onBack} variant="contained" color="primary" sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: '#045d02' } }}>
          Back to Plans
        </Button>
      </Box>
      <Grid container spacing={2}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={6} key={plan.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{plan.name}</Typography>
              <Typography>{plan.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PlanComparisonComponent;
