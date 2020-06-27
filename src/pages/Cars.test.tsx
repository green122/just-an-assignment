import React, {useReducer} from 'react'
import {render, fireEvent} from '@testing-library/react'
import {renderHook, act} from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'
import {CarsListDTO} from "../models/cars.models";
import {carsReducer, initialState} from "./Cars";

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
      dispatch({type: 'SET_FILTER', payload: {filterType: 'manufacturer', value: 'Fiat'}});
    });

    const [newState] = result.current;
    expect(newState.selectedManufacturer).toBe('Fiat');
    expect(newState.currentPage).toBe(5);

    act(() => {
      dispatch({type: 'SET_FILTER', payload: {filterType: 'color', value: 'white'}});
    });

    const [anotherState] = result.current;
    expect(anotherState.selectedManufacturer).toBe('Fiat');
    expect(anotherState.selectedColor).toBe('white');
  });
})


