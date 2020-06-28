import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {CarDTO, CarsListDTO} from "../models/cars.models";
import {Box, Button, Card, CardContent, CardMedia, List, ListItem, Typography} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import {makeStyles} from "@material-ui/core/styles";

interface CarsItemProps {
  car: CarDTO
}

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  picture: {
    width: 60,
    height: 30
  }
});


export function CarsItem({car}: CarsItemProps) {
  const classes = useStyles();
  if (!car) {
    return null;
  }
  return (
    <Card className={classes.root} data-testid="car-item" variant="outlined" color="text.primary">
      <CardContent>
        <CardMedia
          component="img"
          className={classes.picture}
          image={car.pictureUrl}
          title="Contemplative Reptile"
        />
      </CardContent>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {car.modelName}
        </Typography>
        <Typography variant="body2">
          {`Stock # ${car.stockNumber} - ${car.mileage.number} - ${car.mileage.unit} ${car.fuelType} ${car.color}`}
        </Typography>
        <Link component={RouterLink} to={`/details/${car.stockNumber}`}>
          View details
        </Link>

      </CardContent>
    </Card>
  );
};
