import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ appProps }) {
    return (
        <Switch>
        {/* Switch is used to render the first matching route that is defined within it. */}
        {/* exact makes sure that this component matches "/" only. */}
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
            <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
            <AppliedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />
            <AppliedRoute path="/notes/:id" exact component={Notes} appProps={appProps} />
            {/* catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    );
}