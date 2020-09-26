import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CarList from "./views/CarList";
import Login from "./views/Login";
import Contract from "./views/Contract";
import Homepage from "./views/Homepage";
import AddCar from "./views/AddCar";
import Profil from "./views/Profil";
import AddContract from "./views/AddContract";
import CarDetail from "./views/CarDetails";
import About from "./views/About";
import ChangePassword from "./views/ChangePassword";
import ResetPassword from "./views/ResetPassword";
import NewPassword from "./views/NewPassword";
// import HomepageTest from "./views/HomepageTest";


const App = () => {
  return (
    <div style={{ paddingTop: "70px" }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          {/* <Route exact path="/" component={HomepageTest}></Route> */}
          <Route exact path="/carlist" component={CarList}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/contract" component={Contract}></Route>
          <Route exact path="/profil" component={Profil}></Route>
          <Route exact path="/addcontract" component={AddContract}></Route>
          <Route exact path="/addcar" component={AddCar}></Route>
          <Route exact path="/cardetails" component={CarDetail}></Route>
          <Route exact path="/changepassword" component={ChangePassword}></Route>
          <Route exact path="/resetpassword" component={ResetPassword}></Route>
          <Route exact path="/newpassword" component={NewPassword}></Route>
          <Route exact path="/about" component={About}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
