import React, {useReducer} from 'react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect'
import {Cars} from "./Cars";
import {render, waitFor} from "@testing-library/react";
import {carsFixture} from "../components/carsFixture";
import {container, globalReducer, initialState, StoreContext} from "../App";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe.skip('Cars component', () => {
  it('should request data from backend and set them to store', async () => {
    mockedAxios.get.mockImplementationOnce((request: string) => {
      if (request.includes('colors') || request.includes('manufacturers')) {
        return Promise.resolve([])
      }
      return Promise.resolve({data: carsFixture}
      )
    });
    const {queryAllByTestId} = render(
      <StoreContext.Provider value={container}>
        <Cars/>
      </StoreContext.Provider>
    )
    const result = queryAllByTestId('car-item');
    await waitFor(() => expect(queryAllByTestId('car-item').length).toBeGreaterThan(0));
  })
})


