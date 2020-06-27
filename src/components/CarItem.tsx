import React from 'react';
import {CarDTO, CarsListDTO} from "../models/cars.models";
import {Box, Button, Card, CardContent, List, ListItem} from "@material-ui/core";

interface CarsItemProps {
  car: CarDTO
}

export function CarsItem({car}: CarsItemProps) {
  if (!car) {
    return null;
  }
  return (
    <Card data-testid="car-item" variant="outlined" color="text.primary">
      <CardContent>
        {car.modelName}
        {car.stockNumber}
        {car.mileage.number} - {car.mileage.unit}
        {car.color}
      </CardContent>
    </Card>
  );
};
