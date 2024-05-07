import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

function MapDisplay({ locations }) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (locations.length > 0) {
      setCenter({
        lat: locations[0].lat,
        lng: locations[0].lng
      });
    }
  }, [locations]);

  // Aggregate doctors by location
  const locationGroups = locations.reduce((acc, location) => {
    const key = `${location.lat}-${location.lng}`;
    if (!acc[key]) {
      acc[key] = {
        ...location,
        doctors: [location] // Start with the current location as the first doctor
      };
    } else {
      acc[key].doctors.push(location);
    }
    return acc;
  }, {});

  const handleMarkerClick = (locationKey) => {
    setSelectedLocation(locationGroups[locationKey]);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {Object.keys(locationGroups).map((key) => (
        <Marker
          key={key}
          position={{ lat: locationGroups[key].lat, lng: locationGroups[key].lng }}
          onClick={() => handleMarkerClick(key)}
        />
      ))}
      {selectedLocation && (
        <InfoWindow
          position={{
            lat: selectedLocation.lat,
            lng: selectedLocation.lng
          }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div>
            <h2>Doctors at this location:</h2>
            <ul>
              {selectedLocation.doctors.map((doc, index) => (
                <li key={index}>{doc.name} - {doc.specialties}</li>
              ))}
            </ul>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default MapDisplay;
