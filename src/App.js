import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import MovieDetail from "./routes/MovieDetail";
import PersonDetail from "./routes/PersonDetail";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";
import React from "react";
import "./style.css";

function App() {
    return (
        <Router basename="/react_movie_app_2022/">
            <Switch>
                <Route path="/movie/:id">
                    <MovieDetail />
                </Route>
                <Route path="/person/:id">
                    <PersonDetail />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
