import React from 'react';
import { Route, Switch } from "react-router-dom";
import { GameBoard } from "./components";

export default function App() {
  return (
    <div id="app">
      <h1>TAKOYAKI</h1>

      <Switch>
        <Route exact path="/" component={GameBoard} />
      </Switch>

    </div>
  );
}