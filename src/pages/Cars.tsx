import React from 'react';
import axios from 'axios';
import {CircularProgress, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CarsList} from "../components/CarsList";
import {Favourites} from "../components/FavouriteList";
import {Filters} from "../components/Filters";
import {useFetching} from "../hooks/useFetching";
import {useDispatch, useSelector} from "../hooks/useStore";
import {removeEmptyProperties} from "../helpers/removeEmptyProperties";
import {CarsListDTO, ManufacturerDTO} from "../models/cars.models";
import {carsRoute, colorsRoute, manufacturersRoute} from "../constants/apiRoutes.constants";
import {colors} from "../constants/colors.constants";
import {ErrorMessage} from "../components/ErrorMessage";

const useStyles = makeStyles({
  listHeader: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold"
  },
  listCarsNumber: {
    fontSize: 18,
    color: colors.black
  },
  spinner: {
    color: colors.orange
  }
})

export function Cars() {
  
  // just to imitate redux like approach
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const currentPage = useSelector(state => state.currentPage);
  const totalPageCount = useSelector(state => state.totalPageCount);
  const totalCarsCount = useSelector(state => state.totalCarsCount);
  const manufacturersAndColors = useSelector(state => ({manufacturers: state.manufacturers, colors: state.colors}));
  const cars = useSelector(state => state.cars);
  
  const classes = useStyles();
  
  async function fetchCars(): Promise<CarsListDTO> {
    const {data} = await axios.get<CarsListDTO>(carsRoute, {
      params: {
        ...removeEmptyProperties(filters),
        page: currentPage
      }
    });
    dispatch({type: 'SET_CARS', payload: data})
    return data;
  }
  
  async function fetchManufacturersAndColors() {
    const [manufacturersResponse, colorsResponse] = await Promise.all([
      axios.get<{ manufacturers: ManufacturerDTO[] }>(manufacturersRoute),
      axios.get<{ colors: string[] }>(colorsRoute),
    ]);
    const {manufacturers} = manufacturersResponse.data;
    const {colors} = colorsResponse.data;
    dispatch({type: 'SET_MANUFACTURERS_COLORS', payload: {manufacturers, colors}});
    return {manufacturers, colors}
  }
  
  const carsState = useFetching(() => {
    if (cars.length) {
      return null;
    }
    return fetchCars();
  }, null, [filters, currentPage]);
  
  const manufacturersAndColorsState = useFetching(() => {
      if (manufacturersAndColors.manufacturers.length && manufacturersAndColors.colors.length) {
        return null;
      }
      return fetchManufacturersAndColors();
    }, {manufacturers: [], colors: []}, []
  );
  
  if (manufacturersAndColorsState.error || carsState.error) {
    return (
      <Container maxWidth="lg">
        <ErrorMessage message="Something bad has happened. Please try again later."/>
      </Container>)
  }
  
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item sm={5} xs={12} md={5} lg={4}>
          <Filters
            initialFilters={filters}
            isLoading={carsState.isLoading || manufacturersAndColorsState.isLoading}
            manufacturers={manufacturersAndColors.manufacturers}
            colors={manufacturersAndColors.colors}
            onSelect={filters => dispatch({type: 'SET_FILTER', payload: filters})}
          />
          <Favourites/>
        </Grid>
        <Grid item sm={7} xs={12} md={7} lg={7}>
          <Typography className={classes.listHeader} gutterBottom>
            Available cars
          </Typography>
          <Typography className={classes.listCarsNumber} gutterBottom>
            {carsState.isLoading ? '...Loading...' :
              `Showing ${totalCarsCount > 10 ? `10 of ${totalCarsCount}` : `${totalCarsCount}`} result`}
          </Typography>
          {carsState.isLoading && <CircularProgress className={classes.spinner}/>}
          <CarsList
            list={cars}
            page={currentPage}
            totalPageCount={totalPageCount}
            isLoading={carsState.isLoading}
            onPageSelect={(pageNumber) => dispatch({type: 'SET_PAGE', payload: pageNumber})}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
