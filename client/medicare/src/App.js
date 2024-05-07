import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import MapDisplay from './components/MapDisplay';
import { LoadScript } from '@react-google-maps/api';

function App() {
  const apiKey = process.env.REACT_APP_MAPS_API_KEY; 
  return (
    <LoadScript googleMapsApiKey={apiKey}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </Router>
    </LoadScript>
  );
}

export default App;
