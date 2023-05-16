import React, { useRef, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const center = { lat: 48.8584, lng: 2.2945 };

function App() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef();
  const destinationRef = useRef();

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const calculateRoute = async () => {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }

    const directionsServiceOptions = {
      destination: destinationRef.current.value,
      origin: originRef.current.value,
      travelMode: 'DRIVING',
    };

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(directionsServiceOptions, (result, status) => {
      if (status === 'OK') {
        setDirectionsResponse(result);
        const leg = result.routes[0].legs[0];
        setDistance(leg.distance.text);
        setDuration(leg.duration.text);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  };

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          height: '80px',
          width: '100%',
          left: '0px',
          top: '0px',
          borderRadius: '0px',
          backgroundColor: 'brown',
        }}
      >
        <h1>Graviti</h1>
      </div>
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <h4>Origin</h4>
            <input
              type="text"
              placeholder="Origin"
              ref={originRef}
              style={{
                height: '45px',
                width: '250px',
                left: '156px',
                top: '195px',
                borderRadius: '6px',
                padding: '5px',
              }}
            />
            <h4>Destination</h4>
            <input
              type="text"
              placeholder="Destination"
              ref={destinationRef}
              style={{
                height: '45px',
                width: '250px',
                left: '156px',
                top: '195px',
                borderRadius: '6px',
                padding: '5px',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <button onClick={calculateRoute}>Calculate Route</button>
            <button onClick={clearRoute}>Clear Route</button>
          </div>
          <div
            style={{
              height: '155px',
              width: '490px',
              left: '0px',
              top: '0px',
              borderRadius: '8px',
              backgroundColor: '#f0f0f0',
              padding: '10px',
            }}
          >
          <p
            style={{
            width: '200px',
            height: '20px',
            fontFamily: 'IBM Plex Sans',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '100%',
            textAlign: 'right',
            color: 'brown',
          }}
          >
          Distance: {distance}
        </p>
        <p style={{
            width: '200px',
            height: '20px',
            fontFamily: 'IBM Plex Sans',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '100%',
            textAlign: 'right',
            color: 'brown',
          }}>
            Duration: {duration}</p>
        <button
          onClick={() => {
          map.panTo(center);
          map.setZoom(15);
          }}
        >
          Center Map
        </button>
      </div>
      </div>
      <div
        style={{
        marginTop: '80px',
        position: 'relative',
        width: '460px',
        height: '511px',
        borderRadius: '0px',
        marginLeft: '20px',
        overflow: 'hidden',
        }}
      >
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={center}
        zoom={15}
        onLoad={onLoad}
      >
      <Marker position={center} />
        {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      </div>
  </div>
  </div>
)};

export default App;