import React, { useEffect } from 'react';
import { InputLabel, Select, MenuItem, FormControl, Box, Typography, Grid } from '@mui/material';
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
    <Box>
      <Typography variant="body1">Filtrera efter ort, djur och ras</Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth >
            <InputLabel>Ort</InputLabel>
            <Select value={city} onChange={(e) => setCity(e.target.value)} >
              <MenuItem value="">Alla</MenuItem>
              {cities.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Djur</InputLabel>
            <Select value={animal} onChange={(e) => setAnimal(e.target.value)}>
              <MenuItem value="">Alla</MenuItem>
              {animals.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>     
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Ras</InputLabel>
            <Select value={race} onChange={(e) => setRace(e.target.value)}>
              <MenuItem value="">Alla</MenuItem>
              {races.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
       
      
    </Box>
  );
};

LocationFilter.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  animals: PropTypes.arrayOf(PropTypes.string).isRequired,
  races: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default LocationFilter;