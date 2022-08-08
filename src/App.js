import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import React, { useState } from "react";

function App() {
  return (
  <Router basename="/react_movie_app_2022/">
    <Switch>
      <Route path="/movie/:id">
        <Detail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;