import React, {useCallback} from 'react';
import {CarsListDTO} from "../models/cars.models";
import {List} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import {CarsItem} from "./CarItem";

interface CarsListProps {
  list: CarsListDTO;
  page: number;
  onPageSelect: (value: number) => void;
}

export function CarsList({list, page, onPageSelect}: CarsListProps) {
  const handleChange = useCallback((_, selectedPage: number) => onPageSelect(selectedPage), [onPageSelect]);

  if (!list?.cars?.length) {
    return null;
  }

  return (
    <List>
      {list.cars.map(carRow => (
        <CarsItem car={carRow} key={carRow.stockNumber}/>
      ))}
      <Pagination count={list.totalPageCount} page={page} onChange={handleChange} showFirstButton showLastButton/>
    </List>
  );
};
