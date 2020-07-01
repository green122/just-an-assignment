import React, {Fragment} from 'react';
import {CarDTO, CarsListDTO, ManufacturerDTO} from "../models/cars.models";
import {
  Select,
  Button,
  MenuItem,
  Grid,
  InputLabel,
  Typography,
  List,
  CardContent,
  CardMedia,
  Card
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FilterState} from "../models/filters.model";
import {capitalizeFirstLetter} from "../helpers/capitalizeFirstLetter";
import {useFavorite} from "../hooks/useFavourite";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import BrokenImagePicture from "../assets/broken-image.png";
import {colors} from "../constants/colors.constants";

export const useStyles = makeStyles({
  contentContainer: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    maxHeight: 300,
    overflow: "auto",
    border: '1px solid',
    borderColor: colors.lightGray
  },
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
  button: {
    fontSize: 12,
    padding: 0,
    textTransform: "none",
    color: "#EA7F28",
    "&:focus": {
      backgroundColor: "#D37324",
    },
  },
  header: {
    fontSize: 18,
    fontWeight: "bold"
  },
  linkText: {
    fontSize: 12,
    marginRight: 18,
    color: colors.orange,
    "&:hover": {
      color: colors.darkOrange
    }
  },
  contentText: {
    fontSize: 14,
    color: colors.black
  },
  contentTextError: {
    fontSize: 14,
    color: "red"
  },
  cardContent: {
    padding: "0 0 0 12px",
    margin: "auto 0",
    "&:last-child": {
      paddingBottom: 0
    }
  },
  cardContentImage: {
    display: "flex",
    width: 60,
    alignItems: "center",
    backgroundColor: colors.lightGray
  },
  cardImage: {
    width: "100%",
    height: "auto",
    "&:before": {
      display: "block",
      position: "absolute",
      height: 50,
      width: 50,
      backgroundImage: BrokenImagePicture
    }
  }
});

export function Favourites() {
  const {getFavorites, setFavorite} = useFavorite();
  const itemClasses = useStyles();
  const favourites = getFavorites();
  if (!favourites.length) {
    return null;
  }
  return (
    <div className={itemClasses.contentContainer}>
      <Typography>
        Your favourite cars
      </Typography>
      <List>
        {favourites.map((car, index) =>
          <Card key={index} className={itemClasses.root} data-testid="car-item" variant="outlined" color="text.primary">
            <CardContent className={itemClasses.cardContent}>
              {car.error ?
                <Fragment>
                  <Typography className={itemClasses.contentText} variant="body2">
                    {`Stock # ${car.stockNumber} is currently unavailable`}
                  </Typography>
                </Fragment> :
                <Fragment>
                  <Typography className={itemClasses.header} variant="h6" gutterBottom>
                    {car.modelName}
                  </Typography>
                  <Typography className={itemClasses.contentText} variant="body2">
                    {`Stock # ${car.stockNumber} - ${car.mileage.number} - ${car.mileage.unit} ${car.fuelType} - ${capitalizeFirstLetter(car.color)}`}
                  </Typography>
                  <Link className={itemClasses.linkText} component={RouterLink} to={`/details/${car.stockNumber}`}>
                    View details
                  </Link>
                </Fragment>}
              <Button className={itemClasses.button} onClick={() => setFavorite(car.stockNumber)}>Remove from
                favourite</Button>
            </CardContent>
          </Card>
        )}
      </List>
    </div>
  );
};
