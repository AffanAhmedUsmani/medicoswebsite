import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

function MapDisplay({ locations }) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    if (locations.length > 0) {
      setCenter({
        lat: locations[0].lat,
        lng: locations[0].lng
      });
    }
  }, [locations]);

  const onMarkerClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {locations.map(location => (
        <Marker
          key={`${location.lat},${location.lng}`}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => onMarkerClick(location)}
        />
      ))}
      {selectedHospital && (
        <InfoWindow
          position={{
            lat: selectedHospital.lat,
            lng: selectedHospital.lng
          }}
          onCloseClick={() => setSelectedHospital(null)}
        >
          <div>
            <h2>{selectedHospital.name}</h2>
            <p>Phone: {selectedHospital.provider_number}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default MapDisplay;