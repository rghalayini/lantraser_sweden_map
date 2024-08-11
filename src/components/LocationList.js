import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

const LocationList = ({ filteredLocations }) => {
  return (
    <List>
      {filteredLocations.map((location) => (
        <ListItem key={location.id}>
          <ListItemText primary={location.name} secondary={location.address} />
        </ListItem>
      ))}
    </List>
  );
};

LocationList.propTypes = {
  filteredLocations: PropTypes.arrayOf(
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

export default LocationList;