import React, {useReducer} from 'react';
import {act, renderHook} from "@testing-library/react-hooks";
import {globalReducer, initialState} from "./App";

describe('Cars reducer', () => {
  it('should change current page', () => {
    const {result, rerender} = renderHook(() => useReducer(globalReducer, initialState));
    const [state, dispatch] = result.current;

    act(() => {
      dispatch({type: 'SET_PAGE', payload: 3});
    });

    const [newState] = result.current;
    expect(newState.currentPage).toBe(3);
  });

  it('should change current page and filter', () => {
    const {result, rerender} = renderHook(() => useReducer(globalReducer, initialState));
    const [state, dispatch] = result.current;

    act(() => {
      dispatch({type: 'SET_PAGE', payload: 5});
    });
    const [stateWithNeCurrentPage] = result.current;
    expect(stateWithNeCurrentPage.currentPage).toBe(5);

    act(() => {
      dispatch({type: 'SET_FILTER', payload: {manufacturer: 'Fiat', color: 'white'}});
    });

    const [newState] = result.current;
    expect(newState.filters.manufacturer).toBe('Fiat');
    expect(newState.currentPage).toBe(1);

    act(() => {
      dispatch({type: 'SET_FILTER', payload: {manufacturer: '', color: 'yellow'}});
    });

    const [anotherState] = result.current;
    expect(anotherState.filters.manufacturer).toBe('');
    expect(anotherState.filters.color).toBe('yellow');
  });
});
