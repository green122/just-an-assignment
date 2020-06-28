import React, {useReducer} from 'react';
import axios from 'axios';
import {renderHook, act} from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'
import {Cars, carsReducer, initialState} from "./Cars";
import {render, waitFor} from "@testing-library/react";
import {carsFixture} from "../components/carsFixture";
import {CarsList} from "../components/CarsList";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Cars reducer', () => {
  it('should change current page', () => {
    const {result, rerender} = renderHook(() => useReducer(carsReducer, initialState));
    const [state, dispatch] = result.current;

    act(() => {
      dispatch({type: 'SET_PAGE', payload: 3});
    });

    const [newState] = result.current;
    expect(newState.currentPage).toBe(3);
  });

  it('should change current page and filter', () => {
    const {result, rerender} = renderHook(() => useReducer(carsReducer, initialState));
    const [state, dispatch] = result.current;

    act(() => {
      dispatch({type: 'SET_PAGE', payload: 5});
      dispatch({type: 'SET_FILTER', payload: {manufacturer: 'Fiat', color: 'white'}});
    });

    const [newState] = result.current;
    expect(newState.filters.manufacturer).toBe('Fiat');
    expect(newState.currentPage).toBe(5);

    act(() => {
      dispatch({type: 'SET_FILTER', payload: {manufacturer: '', color: 'yellow'}});
    });

    const [anotherState] = result.current;
    expect(anotherState.filters.manufacturer).toBe('');
    expect(anotherState.filters.color).toBe('yellow');
  });
});


describe.skip('Cars component', () => {
  it('should request data from backend and set them to store', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: carsFixture}));
    const {queryAllByTestId} = render(<Cars/>)
    const result = queryAllByTestId('car-item');
    await waitFor(() => expect(queryAllByTestId('car-item').length).toBeGreaterThan(0));
    console.log(result);
  })
})


