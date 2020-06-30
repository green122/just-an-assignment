import React, {Fragment} from 'react';
import axios from 'axios';
import {useHistory, useParams} from "react-router";
import {useFetching} from "../hooks/useFetching";
import {useFavorite} from "../hooks/useFavourite";
import {Box, Button, Card, CardContent, Container, Grid, Typography} from "@material-ui/core";
import {useCardStyles} from "../components/Filters";
import {AddFavourite} from "../components/AddFavourite";
import {capitalizeFirstLetter} from "../helpers/capitalizeFirstLetter";
import {CarDTO} from "../models/cars.models";
import {makeStyles} from "@material-ui/core/styles";


const useDetailsStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: 12,
    padding: 12,
    height: 75
  },
  picture: {
    width: "auto",
    height: "100%",
    margin: "auto"
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A4A4A"
  },
  contentText: {
    fontSize: 18,
    color: "#4A4A4A"
  },
  content: {
    padding: 18,
  },
  imageContainer: {
    backgroundColor: "#EDEDED",
    display: "flex",
    height: 400
  },
  cardContentImage: {
    display: "flex",
    width: 60,
    alignItems: "center",
  }
});


async function fetchCarDetails(stockNumber: string) {
  const response = await axios.get(`https://auto1-mock-server.herokuapp.com/api/cars/${stockNumber}`);
  return response.data.car as CarDTO;
}

export function CarDetails() {

  const classes = useCardStyles();
  const history = useHistory();
  const detailsClasses = useDetailsStyles();
  const {stockNumber} = useParams();
  const {data: car, isLoading, error} = useFetching(() => fetchCarDetails(stockNumber), null, [stockNumber]);

  if (error) {
    history.push('/404');
  }

  if (!car) {
    return null;
  }

  return (
    <Fragment>
      <Container className={detailsClasses.imageContainer} maxWidth="xl">
        <img className={detailsClasses.picture} src={car.pictureUrl}/>
      </Container>
      <Container maxWidth="md">
        <Box mt={5}>
          <Grid container>
            <Grid item md={7} xs={12}>
              <Typography className={detailsClasses.header} variant="h6" gutterBottom>
                {car.modelName}
              </Typography>
              <Typography className={detailsClasses.contentText} variant="body2">
                {`Stock # ${car.stockNumber} - ${car.mileage.number} - ${car.mileage.unit} ${car.fuelType} - ${capitalizeFirstLetter(car.color)}`}
              </Typography>
              <Typography className={detailsClasses.contentText} variant="body2">
                {`This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery times shown in this page are not definitive and may change due to bad weather condition`}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12}>
              {!isLoading && !error && <AddFavourite stockNumber={Number(stockNumber)}/>}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
};
