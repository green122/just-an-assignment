import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {CarDTO, CarsListDTO} from "../models/cars.models";
import {Box, Button, Card, CardContent, CardMedia, List, ListItem, Typography} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import {makeStyles} from "@material-ui/core/styles";
import {capitalizeFirstLetter} from "../helpers/capitalizeFirstLetter";

interface CarsItemProps {
  car: CarDTO
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: 12,
    padding: 12,
    height: 75
  },
  picture: {
    width: 60,
    height: "auto"
  },
  header: {
    fontSize: 18,
    fontWeight: "bold"
  },
  linkText: {
    fontSize: 12,
    color: "#EA7F28",
    "&:hover": {
      color: "#D37324"
    }
  },
  contentText: {
    fontSize: 14,
    color: "#4A4A4A"
  },
  cardContent: {
    padding: "0 0 0 12px",
    "&:last-child": {
      paddingBottom: 0
    }
  },
  cardContentImage: {
    display: "flex",
    width: 60,
    alignItems: "center",
  }
});


export function CarsItem({car}: CarsItemProps) {
  const classes = useStyles();
  if (!car) {
    return null;
  }
  return (
    <Card className={classes.root} data-testid="car-item" variant="outlined" color="text.primary">
      <CardContent className={classes.cardContentImage}>
        <CardMedia
          component="img"
          className={classes.picture}
          image={car.pictureUrl}
          title="Contemplative Reptile"
        />
      </CardContent>

      <CardContent className={classes.cardContent}>
        <Typography className={classes.header} variant="h6" gutterBottom>
          {car.modelName}
        </Typography>
        <Typography className={classes.contentText} variant="body2">
          {`Stock # ${car.stockNumber} - ${car.mileage.number} - ${car.mileage.unit} ${car.fuelType} - ${capitalizeFirstLetter(car.color)}`}
        </Typography>
        <Link className={classes.linkText} component={RouterLink} to={`/details/${car.stockNumber}`}>
          View details
        </Link>

      </CardContent>
    </Card>
  );
};
