import React, {FormEvent, FormEventHandler, useCallback, useState} from 'react';
import {CarDTO, CarsListDTO, ManufacturerDTO} from "../models/cars.models";
import {Select, Button, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FilterState} from "../models/filters.model";

interface FiltersProps {
  manufacturers?: ManufacturerDTO[],
  colors?: string[],
  onSelect: (filterState: FilterState) => void;
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  selector: {
    margin: 10,
    minWidth: 120,
  },
}));

export function Filters({manufacturers = [], colors = [], onSelect}: FiltersProps) {

  const [filter, setFilter] = useState<FilterState>({manufacturer: 'all', color: 'all'});
  const classes = useStyles();

  const handleSelect = useCallback((event: React.ChangeEvent<any>, field: keyof FilterState) => setFilter(prevState => ({
    ...prevState,
    [field]: event.target.value
  })), []);

  const handleSubmit = () => {
    onSelect({
      manufacturer: filter.manufacturer === 'all' ? '' : filter.manufacturer,
      color: filter.color === 'all' ? '' : filter.color,
    })
  };

  return (
    <div className={classes.container}>
      <Select value={filter.manufacturer} autoWidth={true} className={classes.selector}
              data-testid="manufacturers"
              onChange={event => handleSelect(event, 'manufacturer')}>
        <MenuItem key='all' value="all">All manufacturers</MenuItem>
        {manufacturers.map((manufacturer, index) => (
          <MenuItem key={index} value={manufacturer.name}>{manufacturer.name}</MenuItem>))}
      </Select>
      <Select value={filter.color} autoWidth={true} className={classes.selector}
              data-testid="colors"
              onChange={event => handleSelect(event, 'color')}>
        <MenuItem key='all' value="all">All car colors</MenuItem>
        {colors.map((color, index) => (
          <MenuItem key={index} value={color}>{color}</MenuItem>))}
      </Select>
      <Button onClick={handleSubmit}>Filter</Button>
    </div>
  );
};
