import {useEffect, useReducer} from "react";

interface IFetchState<T> {
  data: T,
  isLoading: boolean,
  error?: string
}

type ActionType =
  'request' | 'success' | 'failure';

type Action<T> = {
  type: 'request',
} | {
  type: 'success',
  payload: T
} | {
  type: 'failure',
  payload: string
}

const dataFetchReducer = <T>() => (state: IFetchState<T>, action: Action<T>): IFetchState<T> => {
  switch (action.type) {
    case 'request':
      return {...state, isLoading: true, error: ''};
    case 'success':
      return {...state, isLoading: false, data: action.payload, error: ''};
    case 'failure':
      return {...state, isLoading: false, error: action.payload};
  }
};

export function useFetching<T>(action: () => Promise<T> | null, initialValue: T, deps: any[] = []): IFetchState<T> {

  const initialState: IFetchState<T> = {data: initialValue, error: '', isLoading: false};
  const [state, dispatch] = useReducer(dataFetchReducer<T>(), initialState);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      const promise = action();
      if (!promise) {
        return;
      }

      dispatch({type: 'request'});

      try {
        const result = await promise;
        if (!didCancel) {
          dispatch({type: 'success', payload: result});
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({type: 'failure', payload: error});
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, deps);

  return state;
}
