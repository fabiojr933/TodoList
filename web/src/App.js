import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,

} from "react-router-dom";
import Nav from "./component/nav";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Home from "./component/home";
import axios from "axios";
import TaskNovo from "./component/TaskNovo";
import Finished from './component/finished'

export default function App() {

  const token = localStorage.getItem('token');

  const [user, setUser] = useState();
  const config = localStorage.getItem("emailToken");
  useEffect(() => {
    axios.get("account/get_user/" + config).then(
      (res) => {
        console.log("DATA", res.data);
        setUser(res.data);
      },
      (err) => {
        console.log("Error", err);
      }
    );
  }, [config]);
  // setTimeout(() => {
  //   this.setState({
  //     isLoading: false,
  //   });
  // }, 900);

  return (
    <Router>
          <Switch>
            <Route exact path="/Home" component={Home}>
              <div className="grid-container">
                <Nav />
                <Home user={user} />
              </div>
            </Route>
            <Route exact path="/Task/novo" component={TaskNovo}>
              <Nav /> <TaskNovo />
            </Route>
            <Route exact path="/Task/finished" component={Finished}>
              <Nav /> <Finished />
            </Route>
            <Route exact path="/">
              <Redirect to="/Home" />
            </Route>{" "}
            <Route exact path="/Login" component={Login}>
              {" "}
              <Nav />
              <Login />
            </Route>
            <Route exact path="/SignUp" component={SignUp}>
              {" "}
              <Nav />
              <SignUp />
            </Route>
            <Route component={() => "404 NOT FOUND"} />
          </Switch>  
    </Router>
  );
}
