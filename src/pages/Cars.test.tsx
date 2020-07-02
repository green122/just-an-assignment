import React, {useReducer} from 'react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect'
import {Cars} from "./Cars";
import {render, waitFor} from "@testing-library/react";
import {carsFixture} from "../components/carsFixture";
import {container, globalReducer, initialState, StoreContext} from "../App";
import {BrowserRouter} from "react-router-dom";


const mockFetching: any = {
  data: carsFixture
};

jest.mock('../hooks/useFetching.ts', () => ({
  useFetching: () => mockFetching
}));

describe('Cars component', () => {
  it('should request data from backend and set them to store', async () => {
    const newContainer = {...container, state: {...initialState, cars: carsFixture.cars}}
    const {queryAllByTestId} = render(
      <BrowserRouter>
        <StoreContext.Provider value={newContainer}>
          <Cars/>
        </StoreContext.Provider>
      </BrowserRouter>
    )
    expect(queryAllByTestId('car-item').length).toBeGreaterThan(0);
  })
});


