import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Test from "./views/Test";
import Dashboard from "./views/Dashboard";
import Contract from "./views/Contract";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/test" component={Test}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/contract" component={Contract}></Route>
      </Switch>
    </Router>
  );
};

export default App;
