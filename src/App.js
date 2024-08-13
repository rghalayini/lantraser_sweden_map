import React from 'react';
import { locations } from './data/locations';
import Map from './components/Map';
import LocationList from './components/LocationList';
import LocationFilter from './components/LocationFilter';

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
    <div>
      <LocationFilter cities={cities} animals={animals} races={races} onFilterChange={handleFilterChange} />
      <Map locations={filteredLocations} />
      <LocationList filteredLocations={filteredLocations} />
    </div>
  );
};

export default App;