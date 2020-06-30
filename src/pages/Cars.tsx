import React, {useEffect, useReducer, useState} from 'react';
import axios from 'axios';
import {CarsList} from "../components/CarsList";
import {Action, GlobalState} from "../models/store.model";
import {useFetching} from "../hooks/useFetching";
import {CarDTO, CarsListDTO} from "../models/cars.models";
import {Filters} from "../components/Filters";
import {FilterState} from "../models/filters.model";
import {removeEmptyProperties} from "../helpers/removeEmptyProperties";
import {Container, Grid, Typography} from "@material-ui/core";
import {useFavorite} from "../hooks/useFavourite";
import {useDispatch, useSelector} from "../hooks/useStore";
import {carsRoute} from "../constants/apiRoutes.constants";
import {Favourites} from "../components/FavouriteList";


async function fetchManufacturersAndColors() {
  const [manufacturersResponse, colorsResponse] = await Promise.all([
    axios.get('https://auto1-mock-server.herokuapp.com/api/manufacturers'),
    axios.get('https://auto1-mock-server.herokuapp.com/api/colors'),
  ]);
  return {manufacturers: manufacturersResponse.data.manufacturers, colors: colorsResponse.data.colors}
}

export function Cars() {
  const dispatch = useDispatch();
  console.log(useSelector(state => state));
  const filters = useSelector(state => state.filters);
  const currentPage = useSelector(state => state.currentPage);
  const totalPageCount = useSelector(state => state.totalPageCount);
  const totalCarsCount = useSelector(state => state.totalCarsCount);
  const cars = useSelector(state => state.cars);

  const {setFavorite, getFavorites} = useFavorite();

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

  const carsState = useFetching(() => {
    if (cars.length) {
      return null;
    }
    return fetchCars();
  }, null, [filters, currentPage]);

  const manufacturersAndColors = useFetching(async () => {
      const result = await fetchManufacturersAndColors();
      return result;
    }, {manufacturers: [], colors: []}, []
  );

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Filters initialFilters={filters} manufacturers={manufacturersAndColors.data.manufacturers}
                   colors={manufacturersAndColors.data.colors}
                   onSelect={filters => dispatch({type: 'SET_FILTER', payload: filters})}/>
          <Favourites/>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Typography variant="h6" gutterBottom>
            Available cars
          </Typography>
          <Typography variant="h6" gutterBottom>
            Showing {totalCarsCount > 10 ? `10 of ${totalCarsCount}` : `${totalCarsCount}`} result
          </Typography>
          <CarsList list={cars} page={currentPage} totalPageCount={totalPageCount} isLoading={carsState.isLoading}
                    onPageSelect={(pageNumber) => dispatch({type: 'SET_PAGE', payload: pageNumber})}/>
        </Grid>
      </Grid>
    </Container>
  );
};
