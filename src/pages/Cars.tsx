import React from 'react';
import {CarsList} from "../components/CarsList";
import {carsFixture} from "../components/carsFixture";

export function Cars() {
  return (
    <div>
      <CarsList list={carsFixture} page={1} onPageSelect={console.log}/>
    </div>
  );
};
