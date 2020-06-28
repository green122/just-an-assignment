import React from 'react';
import axios from 'axios';
import {useParams} from "react-router";
import {useFetching} from "../hooks/useFetching";


async function fetchCarDetails(stockNumber: string) {
  const response = await axios.get(`https://auto1-mock-server.herokuapp.com/api/cars/${stockNumber}`);
  return response.data;
}

export function CarDetails() {

  const {stockNumber} = useParams();

  const carDetailsState = useFetching(() => fetchCarDetails(stockNumber), null, [stockNumber]);
  console.log(carDetailsState);
  return (
    <div>
      CarDetails
    </div>
  );
};
