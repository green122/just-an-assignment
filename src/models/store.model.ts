import {CarDTO, CarsListDTO, ManufacturerDTO} from "./cars.models";
import {FilterState} from "./filters.model";


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
  | {
  type: 'SET_MANUFACTURERS_COLORS',
  payload: {manufacturers: ManufacturerDTO[], colors: string[]}
}

export interface GlobalState {
  currentPage: number;
  totalPageCount: number;
  totalCarsCount: number;
  cars: CarDTO[];
  filters: FilterState;
  manufacturers: ManufacturerDTO[];
  colors: string[];
}
