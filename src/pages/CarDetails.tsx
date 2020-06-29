import React from 'react';
import axios from 'axios';
import {useParams} from "react-router";
import {useFetching} from "../hooks/useFetching";
import {useFavorite} from "../hooks/useFavoutire";
import {Button} from "@material-ui/core";
import {useCardStyles} from "../components/Filters";
import {AddFavourite} from "../components/AddFavourite";


async function fetchCarDetails(stockNumber: string) {
  const response = await axios.get(`https://auto1-mock-server.herokuapp.com/api/cars/${stockNumber}`);
  return response.data;
}

export function CarDetails() {

  const classes = useCardStyles();
  const {stockNumber} = useParams();
  const carDetailsState = useFetching(() => fetchCarDetails(stockNumber), null, [stockNumber]);

  return (
    <div>
      <AddFavourite stockNumber={stockNumber}/>
      CarDetails
    </div>
  );
};
