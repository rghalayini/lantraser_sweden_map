import React from 'react';
import { locations } from './data/locations';
import Map from './components/Map';
import LocationList from './components/LocationList';
import LocationFilter from './components/LocationFilter';
import { Typography, Grid, Container, Box } from '@mui/material';

const styles ={
  imageStyle: {
    width:"60%",
  },
  marginBottom:{
    marginBottom: "20px",
  },
  bold:{
    fontWeight: "bold",
  },
  listBox: {
    overflowY: "auto",
    maxHeight: "100%",
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
    <Grid container spacing={2} mt={2} >
      <Grid item xs={12}>
        <Typography variant="h5" sx={styles.bold}>Genbankskarta </Typography>
      </Grid>
      <Grid item xs={12} sx={{height: "calc(100vh - 260px)", maxHeight: "700px"}}>
        <Grid container spacing={2} sx={{height: "100%"}}>
          <Grid item xs={12} md={8} sx={{height: "100%"}}>
            <Map locations={filteredLocations} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <LocationFilter cities={cities} animals={animals} races={races} onFilterChange={handleFilterChange} />
            <Typography sx={styles.bold}>Filtrerad lista</Typography>
            <Box sx={{ ...styles.listBox, flex: 1 }}>
              <LocationList filteredLocations={filteredLocations} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Container>
  );
};

export default App;