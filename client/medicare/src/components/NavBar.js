import React from 'react';
import { AppBar, Toolbar, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../static/l.png'; 

function Navbar() {
  const theme = useTheme();

  return (
    <AppBar position="static" style={{ background: '#070F2B'}}>
      <Toolbar>'
        <img src={logo} alt="Logo" style={{ height: '50px', marginRight: theme.spacing(2) }} />
        {/* <Typography variant="h6" style={{ flexGrow: 1 }}>
          Medical Search
        </Typography> */}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
