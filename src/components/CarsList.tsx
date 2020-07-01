import React, {useCallback} from 'react';
import {List} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles} from "@material-ui/core/styles";

import {CarsItem} from "./CarItem";
import CarItemPlaceholder from "./CarItemPlaceholder";
import {CarDTO} from "../models/cars.models";

interface CarsListProps {
  list: CarDTO[];
  page: number;
  isLoading: boolean;
  totalPageCount: number;
  onPageSelect: (value: number) => void;
}

const useStyles = makeStyles({
  list: {
    paddingBottom: 12
  },
  paginatorContainer: {
    display: "flex",
    justifyContent: "center"
  }
})

export function CarsList({list, page, isLoading, totalPageCount, onPageSelect}: CarsListProps) {

  const classes = useStyles();
  const handleChange = useCallback((_, selectedPage: number) => onPageSelect(selectedPage), [onPageSelect]);
  if (isLoading) {
    return (
      <List>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <CarItemPlaceholder key={index}/>
        ))}
      </List>)
  }
  // I used index instead of stocknumber because stocknumber wasn't unique. It led to bug. Index is Ok in our case
  return (
    <List className={classes.list}>
      {list.map((carRow, index) => (
        <CarsItem car={carRow} key={index}/>
      ))}
      <Pagination
        className={classes.paginatorContainer}
        count={totalPageCount}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </List>
  );
};
