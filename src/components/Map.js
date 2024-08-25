import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { createRoot } from 'react-dom/client';

const styles={
  bold: {
    fontWeight: 700,
  },
};
const PopupContent = ({ city, animal, race }) => (
  <Box sx={{ padding: 1 }}>
    <Typography variant="body1" sx={styles.bold} gutterBottom>{city}</Typography>
    <Typography variant="body2">Djur: {animal}</Typography>
    <Typography variant="body2">Ras: {race}</Typography>
  </Box>
);
PopupContent.propTypes = {
  city: PropTypes.string.isRequired,
  animal: PropTypes.string.isRequired,
  race: PropTypes.string.isRequired,
};


const Map = ({ locations }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]); // Store markers to manage them
  const [lng, setLng] = useState(12.8545);
  const [lat, setLat] = useState(62.1362);
  const [zoom, setZoom] = useState(3.38);


  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

  }, [lat, lng, zoom, locations]);

  useEffect(() => {
    if (!map.current) return; // Ensure the map is initialized
  
    // Clear existing markers
    markers.current.forEach(({ marker, root }) => {
      root.unmount();
      marker.remove();
    });
    markers.current = []; // Reset markers array
  
    // Add new markers for the filtered locations
    locations.forEach((location) => {
      // Create a DOM element for the popup
      const popupNode = document.createElement('div');
      
      // Create a root for the popup content
      const root = createRoot(popupNode);
      
      // Render the React component to the DOM element
      root.render(
        <PopupContent 
          city={location.city} 
          animal={location.animal} 
          race={location.race} 
        />
      );
  
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setDOMContent(popupNode);
  
      // Create marker
      const marker = new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup) // Attach popup to marker
        .addTo(map.current);
  
      // Store both the marker and the root in the ref
      markers.current.push({ marker, root });
    });
  
    // Cleanup function
    return () => {
      markers.current.forEach(({ marker, root }) => {
        if (marker.getPopup()) {
          // Unmount the React component
          root.unmount();
        }
        marker.remove();
      });
      markers.current = [];
    };
  }, [locations]); // Run this effect when locations change
  return  <Box ref={mapContainer} sx={{height: "100%"}}/>;
};

Map.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Map;