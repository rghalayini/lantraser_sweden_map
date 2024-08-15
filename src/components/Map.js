import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

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
    markers.current.forEach(marker => marker.remove());
    markers.current = []; // Reset markers array

    // Add new markers for the filtered locations
    locations.forEach((location) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current);
      markers.current.push(marker); // Store the marker reference
    });
  }, [locations]); // Run this effect when locations change
  
  return  <Box ref={mapContainer} sx={{height: "400px"}}/>;
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