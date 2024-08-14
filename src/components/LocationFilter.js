import React, { useEffect } from 'react';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import PropTypes from 'prop-types';

const LocationFilter = ({ cities, animals, races, onFilterChange }) => {
  const [city, setCity] = React.useState('');
  const [animal, setAnimal] = React.useState('');
  const [race, setRace] = React.useState('');

  // Effect to handle filter change
  useEffect(() => {
    onFilterChange({ city, animal, race });
  }, [city, animal, race, onFilterChange]); // Trigger on change of any filter


  return (
    <div>
      <FormControl>
        <InputLabel>City</InputLabel>
        <Select value={city} onChange={(e) => setCity(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {cities.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Animal</InputLabel>
        <Select value={animal} onChange={(e) => setAnimal(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {animals.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>      
      <FormControl>
        <InputLabel>Race</InputLabel>
        <Select value={race} onChange={(e) => setRace(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {races.map((t) => (
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
  animals: PropTypes.arrayOf(PropTypes.string).isRequired,
  races: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default LocationFilter;