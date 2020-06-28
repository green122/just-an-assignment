import React, {useReducer, useState} from 'react';
import axios from 'axios';
import {CarsList} from "../components/CarsList";
import {Action, CarsState} from "../models/store.model";
import {useFetching} from "../hooks/useFetching";
import {CarDTO, CarsListDTO} from "../models/cars.models";
import {Filters} from "../components/Filters";
import {FilterState} from "../models/filters.model";
import {removeEmptyProperties} from "../helpers/removeEmptyProperties";
import {Grid} from "@material-ui/core";

export function carsReducer(state: CarsState, action: Action): CarsState {
  switch (action.type) {
    case "SET_PAGE":
      return {...state, currentPage: action.payload};
      break;
    case "SET_FILTER":
      return {...state, filters: action.payload};
      break;
    case "SET_CARS":
      const {cars, totalPageCount} = action.payload;
      return {...state, cars, totalPageCount, currentPage: 1};
      break;
    default:
      return state;
  }
}

export const initialState: CarsState = {
  cars: [],
  totalPageCount: 0,
  currentPage: 1,
  filters: {manufacturer: '', color: ''}
}

async function fetchCars(filters: FilterState): Promise<CarsListDTO> {
  const result = await axios.get<CarsListDTO>('https://auto1-mock-server.herokuapp.com/api/cars', {params: removeEmptyProperties(filters)});
  return result.data;
}

async function fetchManufacturersAndColors() {
  const [manufacturersResponse, colorsResponse] = await Promise.all([
    axios.get('https://auto1-mock-server.herokuapp.com/api/manufacturers'),
    axios.get('https://auto1-mock-server.herokuapp.com/api/colors'),
  ]);
  return {manufacturers: manufacturersResponse.data.manufacturers, colors: colorsResponse.data.colors}
}

export function Cars() {
  const [state, dispatch] = useReducer(carsReducer, initialState);

  const carsState = useFetching(async () => {
    const result = await fetchCars(state.filters);
    dispatch({type: 'SET_CARS', payload: result})
    return result;
  }, null, [state.filters]);

  const manufacturersAndColors = useFetching(async () => {
      const result = await fetchManufacturersAndColors();
      return result;
    }, {manufacturers: [], colors: []}, []
  );

  console.log(manufacturersAndColors);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <Filters manufacturers={manufacturersAndColors.data.manufacturers} colors={manufacturersAndColors.data.colors}
                   onSelect={filters => dispatch({type: 'SET_FILTER', payload: filters})}/>
        </Grid>
        <Grid item sm={8}>
          <CarsList list={state.cars} page={state.currentPage} totalPageCount={state.totalPageCount}
                    onPageSelect={(pageNumber) => dispatch({type: 'SET_PAGE', payload: pageNumber})}/>
        </Grid>
      </Grid>
    </div>
  );
};
