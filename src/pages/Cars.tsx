import React from 'react';
import {CarsList} from "../components/CarsList";
import {carsFixture} from "../components/carsFixture";
import {Action, CarsState} from "../models/store.model";

export function carsReducer(state: CarsState, action: Action): CarsState {
  switch (action.type) {
    case "SET_PAGE":
      return {...state, currentPage: action.payload};
      break;
    case "SET_FILTER":
      const field = action.payload.filterType === 'manufacturer' ? 'selectedManufacturer' : 'selectedColor';
      return {...state, [field]: action.payload.value};
      break;
    default:
      return state;
  }
}

export const initialState: CarsState = {
  cars: [],
  totalPageNumber: 0,
  currentPage: 1,
  selectedColor: '',
  selectedManufacturer: ''
}

export function Cars() {
  return (
    <div>
      <CarsList list={carsFixture} page={1} onPageSelect={console.log}/>
    </div>
  );
};
