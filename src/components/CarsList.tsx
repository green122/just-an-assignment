import React from 'react';
import {CarsListDTO} from "../models/cars.models";
import {Box, Button, Card, CardContent, List, ListItem} from "@material-ui/core";

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
        <Card data-testid="car-item" variant="outlined" color="text.primary" key={carRow.stockNumber}>
          <CardContent>
            {carRow.modelName}
            {carRow.stockNumber}
            {carRow.mileage.number} - {carRow.mileage.unit}
            {carRow.color}
          </CardContent>
        </Card>
      ))}
    </List>
  );
};
