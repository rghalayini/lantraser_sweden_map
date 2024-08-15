import React from 'react';
import { locations } from './data/locations';
import Map from './components/Map';
import LocationList from './components/LocationList';
import LocationFilter from './components/LocationFilter';
import { Typography, Grid, Container, Box } from '@mui/material';

const styles ={
  imageStyle: {
    width:"100%",
  },
  marginBottom:{
    marginBottom: "20px",
  },
};
const App = () => {
  const [filteredLocations, setFilteredLocations] = React.useState(locations);

  const handleFilterChange = ({ city, animal, race }) => {
    let filtered = locations;
    if (city) {
      filtered = filtered.filter((l) => l.city === city);
    }
    if (animal) {
      filtered = filtered.filter((l) => l.animal === animal);
    }
    if (race) {
      filtered = filtered.filter((l) => l.race === race);
    }
    setFilteredLocations(filtered);
  };

  const cities = [...new Set(locations.map((l) => l.city))];
  const animals = [...new Set(locations.map((l) => l.animal))];
  const races = [...new Set(locations.map((l) => l.race))];


  return (
  <Container maxWidth="lg">
    <Box component="img" src="https://www.kackel.se/wp-content/themes/kackel/images/svenska_lanthonsklubben_topp.jpg" sx={styles.imageStyle}/>
    <Grid container spacing={2} mt={2}>
      <Grid item xx={12}>
        <Typography variant="h5">Genbankskarta </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <LocationFilter cities={cities} animals={animals} races={races} onFilterChange={handleFilterChange} />
            <Map locations={filteredLocations} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LocationList filteredLocations={filteredLocations} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Container>
  );
};

export default App;