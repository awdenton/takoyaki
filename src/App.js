import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Home } from "./components";

export default function App() {
  return (
    <div id="app">
      <h1>This is gonna be an app. \projects\takoyaki\src\App.js</h1>

      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>

    </div>
  );
}