import React from 'react';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import PropTypes from 'prop-types';

const LocationFilter = ({ cities, types, onFilterChange }) => {
  const [city, setCity] = React.useState('');
  const [type, setType] = React.useState('');

  const handleFilterChange = () => {
    onFilterChange({ city, type });
  };

  return (
    <div>
      <FormControl>
        <InputLabel>City</InputLabel>
        <Select value={city} onChange={(e) => setCity(e.target.value)} onClose={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          {cities.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)} onClose={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          {types.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};


LocationFilter.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};


export default LocationFilter;