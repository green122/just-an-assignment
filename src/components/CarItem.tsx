import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import Link from '@material-ui/core/Link';

import {capitalizeFirstLetter} from "../helpers/capitalizeFirstLetter";
import BrokenImagePicture from '../assets/broken-image.png'
import {colors} from "../constants/colors.constants";
import {CarDTO} from "../models/cars.models";

interface CarsItemProps {
  car: CarDTO
}

export const useStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: 12,
    padding: 12,
    minHeight: 75,
    borderColor: colors.lightGray
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
    color: colors.orange,
    "&:hover": {
      color: colors.darkOrange
    }
  },
  contentText: {
    fontSize: 14,
    color: colors.black,
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
    backgroundColor: colors.lightGray,
  },
  cardImage: {
    width: "100%",
    height: "auto",
  }
});

function getFallbackImage(ev: React.SyntheticEvent<HTMLImageElement, Event>) {
  (ev.target as HTMLImageElement).src = BrokenImagePicture;
}

export function CarsItem({car}: CarsItemProps) {
  const classes = useStyles();
  if (!car) {
    return null;
  }
  return (
    <Card className={classes.root} data-testid="car-item" variant="outlined" color="text.primary">
      <CardContent className={classes.cardContentImage}>
        <CardMedia
          component={() => (
            <img alt="Car Preview" onError={getFallbackImage} className={classes.cardImage} src={car.pictureUrl}/>)}
          className={classes.picture}
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
