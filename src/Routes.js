import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";

export default function Routes() {
    return (
        <Switch>
        {/* Switch is used to render the first matching route that is defined within it. */}
        {/* exact makes sure that this component matches "/" only. */}
            <Route path="/" exact component={Home} />
        </Switch>
    );
}