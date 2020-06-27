import React, {useCallback} from 'react';
import {CarDTO, CarsListDTO} from "../models/cars.models";
import {List} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import {CarsItem} from "./CarItem";

interface CarsListProps {
  list: CarDTO[];
  page: number
  totalPageCount: number;
  onPageSelect: (value: number) => void;
}

export function CarsList({list, page, totalPageCount, onPageSelect}: CarsListProps) {
  const handleChange = useCallback((_, selectedPage: number) => onPageSelect(selectedPage), [onPageSelect]);

  return (
    <List>
      {list.map(carRow => (
        <CarsItem car={carRow} key={carRow.stockNumber}/>
      ))}
      <Pagination count={totalPageCount} page={page} onChange={handleChange} showFirstButton showLastButton/>
    </List>
  );
};
