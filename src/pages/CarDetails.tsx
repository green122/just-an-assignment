import React, {Fragment, useEffect} from 'react';
import axios from 'axios';
import {useHistory, useParams} from "react-router";
import {Box, CircularProgress, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {AddFavourite} from "../components/AddFavourite";
import {useFetching} from "../hooks/useFetching";
import {capitalizeFirstLetter} from "../helpers/capitalizeFirstLetter";
import {CarDTO} from "../models/cars.models";
import {colors} from "../constants/colors.constants";
import {detailsRoute} from "../constants/apiRoutes.constants";
import {ErrorMessage} from "../components/ErrorMessage";


const useDetailsStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: 12,
    padding: 12,
    height: 75
  },
  contentContainer: {
    minHeight: "calc(100vh - 400px)",
    maxWidth: 800
  },
  errorContainer: {
    minHeight: "calc(100vh - 180px)",
    maxWidth: 800
  },
  picture: {
    width: "auto",
    height: "100%",
    margin: "auto"
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 12
  },
  contentText: {
    fontSize: 18,
    color: colors.black,
    marginBottom: 12
  },
  additionalText: {
    fontSize: 14,
    color: colors.black
  },
  content: {
    padding: 18,
  },
  imageContainer: {
    backgroundColor: colors.lightGray,
    display: "flex",
    height: 400,
    minHeight: 400,
    position: "relative"
  },
  cardContentImage: {
    display: "flex",
    width: 60,
    alignItems: "center",
  },
  spinner: {
    color: colors.orange,
    position: "absolute",
    top: "calc(50% - 20px)",
    left: "calc(50% - 20px)"
  }
});


async function fetchCarDetails(stockNumber: number) {
  const response = await axios.get(detailsRoute(stockNumber));
  return response.data.car as CarDTO;
}

export function CarDetails() {

  const history = useHistory();
  const detailsClasses = useDetailsStyles();
  const {stockNumber} = useParams();
  const {data: car, isLoading, error} = useFetching(() => fetchCarDetails(Number(stockNumber)), null, [stockNumber]);


  useEffect(() => {
    if (error?.response?.status === 404) {
      history.push('/404');
    }
  }, [error, history])


  if (error) {
    return (
      <Container className={detailsClasses.errorContainer}>
        <ErrorMessage message="Something bad has happened. Please try again later."/>
      </Container>)
  }
  return (
    <Fragment>
      <Container className={detailsClasses.imageContainer} maxWidth="xl">
        {!isLoading && !!car && <img alt="Car Logo" className={detailsClasses.picture} src={car.pictureUrl}/>}
        {isLoading && <CircularProgress className={detailsClasses.spinner}/>}
      </Container>
      <Container className={detailsClasses.contentContainer}>
        <Box mt={5}>
          <Grid container spacing={3}>
            {car && <Grid item md={6} xs={12}>
              <Typography className={detailsClasses.header} variant="h6" gutterBottom>
                {car.modelName}
              </Typography>
              <Typography className={detailsClasses.contentText} variant="body2">
                {`Stock # ${car.stockNumber} - ${car.mileage.number} - ${car.mileage.unit} ${car.fuelType} - ${capitalizeFirstLetter(car.color)}`}
              </Typography>
              <Typography className={detailsClasses.additionalText} variant="body2">
                {`This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery times shown in this page are not definitive and may change due to bad weather condition`}
              </Typography>
            </Grid>}
            <Grid item md={5} xs={12}>
              {!isLoading && !error && <AddFavourite stockNumber={Number(stockNumber)}/>}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
};
