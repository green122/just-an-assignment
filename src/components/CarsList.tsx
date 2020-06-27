import React from 'react';
import {CarsListDTO} from "../models/cars.models";
import {Box, Button, Card, CardContent, List, ListItem} from "@material-ui/core";
import {CarsItem} from "./CarItem";

interface CarsListProps {
  list: CarsListDTO
}

export function CarsList({list}: CarsListProps) {
  if (!list?.cars?.length) {
    return null;
  }
  return (
    <List>
      <Button>some button</Button>
      {list.cars.map(carRow => (
        <CarsItem car={carRow} key={carRow.stockNumber}/>
      ))}
    </List>
  );
};
