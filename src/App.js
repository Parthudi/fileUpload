import React from "react";
import {Switch, Route} from "react-router-dom";
import HomePage from "./components/Homepage/homepage";
import './App.css';

const App = () => {

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
