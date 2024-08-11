import React from 'react';
import { locations } from './data/locations';
import Map from './components/Map';
import LocationList from './components/LocationList';
import LocationFilter from './components/LocationFilter';

const App = () => {
  const [filteredLocations, setFilteredLocations] = React.useState(locations);

  const handleFilterChange = ({ city, type }) => {
    let filtered = locations;
    if (city) {
      filtered = filtered.filter((l) => l.city === city);
    }
    if (type) {
      filtered = filtered.filter((l) => l.type === type);
    }
    setFilteredLocations(filtered);
  };

  const cities = [...new Set(locations.map((l) => l.city))];
  const types = [...new Set(locations.map((l) => l.type))];

  return (
    <div>
      <LocationFilter cities={cities} types={types} onFilterChange={handleFilterChange} />
      <Map locations={filteredLocations} />
      <LocationList filteredLocations={filteredLocations} />
    </div>
  );
};

export default App;