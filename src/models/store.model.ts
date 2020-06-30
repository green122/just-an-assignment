import {CarDTO, CarsListDTO} from "./cars.models";
import {FilterState} from "./filters.model";

export type ActionType = 'SET_PAGE' | 'SET_FILTER';

export interface SetFilter {
  filterType: 'manufacturer' | 'color';
  value: string;
}

export type Action = {
  type: 'SET_PAGE',
  payload: number;
} | {
  type: 'SET_FILTER',
  payload: FilterState
} | {
  type: 'SET_CARS',
  payload: CarsListDTO
}

export interface GlobalState {
  currentPage: number;
  totalPageCount: number;
  totalCarsCount: number;
  cars: CarDTO[];
  filters: FilterState;
}
