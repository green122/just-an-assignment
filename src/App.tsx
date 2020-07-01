import React, {createContext, useReducer} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Cars} from "./pages/Cars";
import {CarDetails} from "./pages/CarDetails";
import {ErrorPage} from "./pages/ErrorPage";
import {Action, GlobalState} from "./models/store.model";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";


export function globalReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case "SET_PAGE":
      return {...state, currentPage: action.payload, cars: []};
      break;
    case "SET_FILTER":
      return {...state, filters: action.payload, cars: [], currentPage: 1};
      break;
    case "SET_CARS":
      const {cars, totalPageCount, totalCarsCount} = action.payload;
      return {...state, cars, totalPageCount, totalCarsCount};
      break;
    default:
      return state;
  }
}

export const initialState: GlobalState = {
  cars: [],
  totalPageCount: 0,
  totalCarsCount: 0,
  currentPage: 1,
  filters: {manufacturer: '', color: ''}
}

export const container = {
  state: initialState,
  dispatch: ((_: Action) => {
  }) as React.Dispatch<Action>
};
export const StoreContext = createContext(container);

function App() {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return (
    <BrowserRouter>
      <StoreContext.Provider value={{...container, state, dispatch}}>
        <Header/>
        <Switch>
          <Route exact={true} path="/" component={Cars}/>
          <Route exact={true} path="/details/:stockNumber" component={CarDetails}/>
          <Route exact={true} path="*" component={ErrorPage}/>
        </Switch>
        <Footer/>
      </StoreContext.Provider>
    </BrowserRouter>
  );
}

export default App;
