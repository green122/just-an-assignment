import {CarDTO} from "./cars.models";

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
  payload: SetFilter
}

export interface CarsState {
  currentPage: number;
  totalPageNumber: number;
  cars: CarDTO[];
  selectedManufacturer: string;
  selectedColor: string;
}
