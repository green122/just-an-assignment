import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Cars} from "./pages/Cars";
import {CarDetails} from "./pages/CarDetails";
import {ErrorPage} from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Cars}/>
        <Route exact={true} path="/details/:stockNumber" component={CarDetails}/>
        <Route exact={true} path="*" component={ErrorPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
