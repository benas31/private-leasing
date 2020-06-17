import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CarList from "./views/CarList";
import Login from "./views/Login";
import Test from "./views/Test";
import Dashboard from "./views/Dashboard";
import Contract from "./views/Contract";
import Homepage from "./views/Homepage";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/test" component={Test}></Route>
        <Route exact path="/carlist" component={CarList}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/contract" component={Contract}></Route>
      </Switch>
    </Router>
  );
};

export default App;
