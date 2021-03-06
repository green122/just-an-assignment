import React, {createContext, useReducer} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Cars} from "./pages/Cars";
import {CarDetails} from "./pages/CarDetails";
import {ErrorPage} from "./pages/ErrorPage";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {ErrorBoundary} from "./components/ErrorBoundary";
import {Action, GlobalState} from "./models/store.model";


export function globalReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case "SET_PAGE":
      return {...state, currentPage: action.payload, cars: []};
    case "SET_FILTER":
      return {...state, filters: action.payload, cars: [], currentPage: 1};
    case "SET_CARS":
      const {cars, totalPageCount, totalCarsCount} = action.payload;
      return {...state, cars, totalPageCount, totalCarsCount};
    case "SET_MANUFACTURERS_COLORS":
      const {manufacturers, colors} = action.payload;
      return {...state, manufacturers, colors};
    default:
      return state;
  }
}

export const initialState: GlobalState = {
  cars: [],
  totalPageCount: 0,
  totalCarsCount: 0,
  currentPage: 1,
  filters: {manufacturer: '', color: ''},
  manufacturers: [],
  colors: []
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
        <ErrorBoundary>
          <Header/>
          <Switch>
            <Route exact={true} path="/" component={Cars}/>
            <Route exact={true} path="/details/:stockNumber" component={CarDetails}/>
            <Route exact={true} path="*" component={ErrorPage}/>
          </Switch>
          <Footer/>
        </ErrorBoundary>
      </StoreContext.Provider>
    </BrowserRouter>
  );
}

export default App;
