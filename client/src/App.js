import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import NotFound from "./components/pages/NotFound";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import DashboardAdmin from "./components/admin/DashboardAdmin";
import DashboardTherapist from "./components/therapist/DashboardTherapist";
import DashboardParent from "./components/parent/DashboardParent";

import AddTherapist from "./components/therapist/AddTherapist";
import AddParent from "./components/parent/AddParent";
import AddPatient from "./components/patient/AddPatient";

import "./App.css";

// check for token

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // decode token and get user info and exp

  const decoded = jwt_decode(localStorage.jwtToken);

  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />

            <div className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/admin-dashboard"
                  component={DashboardAdmin}
                />{" "}
                <Route
                  exact
                  path="/therapist-dashboard"
                  component={DashboardTherapist}
                />
                <Route
                  exact
                  path="/parent-dashboard"
                  component={DashboardParent}
                />
                <Route
                  exact
                  path="/terapeuta/adicionar"
                  component={AddTherapist}
                />
                <Route exact path="/parente/adicionar" component={AddParent} />
                <Route
                  exact
                  path="/paciente/adicionar"
                  component={AddPatient}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
