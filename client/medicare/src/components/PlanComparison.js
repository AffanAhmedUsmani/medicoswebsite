import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function PlanComparison() {
  const plans = [
    { name: "Basic Plan", features: ["Feature 1", "Feature 2"] },
    { name: "Premium Plan", features: ["Feature 1", "Feature 2", "Feature 3"] }
  ];

  return (
    <div>
      {plans.map((plan, index) => (
        <Card key={index} style={{ margin: 10 }}>
          <CardContent>
            <Typography variant="h5">{plan.name}</Typography>
            <ul>
              {plan.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PlanComparison;
