import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import AccessRoute from "./components/common/AccessRoute";

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
import TherapistProfile from "./components/therapist/TherapistProfile"
import DashboardParent from "./components/parent/DashboardParent";

import AddTherapist from "./components/therapist/AddTherapist";
import AddParent from "./components/parent/AddParent";
import AddPatient from "./components/patient/AddPatient";

import EditTherapist from "./components/therapist/EditTherapist";
import EditParent from "./components/parent/EditParent";
import EditPatient from "./components/patient/EditPatient";

import AddMedicine from "./components/patient/AddMedicine";
import EditMedicine from "./components/patient/EditMedicine";

import PatientProfile from "./components/patient/PatientProfile";

import AddTherapeuticNote from "./components/therapist/AddTherapeuticNote";
import TherapeuticNoteDetails from "./components/therapist/TherapeuticNoteDetails";

import AddNote from "./components/parent/AddNote";
import AddResource from "./components/therapist/AddResource";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
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
                <PrivateRoute
                  exact
                  path="/admin-dashboard"
                  component={DashboardAdmin}
                />{" "}
                <Route
                  exact
                  path="/terapeuta-dashboard"
                  component={DashboardTherapist}
                />
                <Route
                  exact
                  path="/parente-dashboard"
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
                <Route
                  exact
                  path="/terapeuta/editar/:id"
                  component={EditTherapist}
                />
                <Route
                  exact
                  path="/parente/editar/:id"
                  component={EditParent}
                />
                <Route
                  exact
                  path="/paciente/editar/:id"
                  component={EditPatient}
                />
                <Route
                  exact
                  path="/paciente/ver/:id"
                  component={PatientProfile}
                />
                <Route
                  exact
                  path="/paciente/:id/medicamento/adicionar"
                  component={AddMedicine}
                />
                <Route
                  exact
                  path="/paciente/:id/ver/medicamento/editar/:medicamento_id"
                  component={EditMedicine}
                />
                <Route
                  exact
                  path="/recurso/adicionar"
                  component={AddResource}
                />
                <Route
                  exact
                  path="/paciente/:id/registo/adicionar"
                  component={AddTherapeuticNote}
                />
                <Route
                  exact
                  path="/paciente/:id/observação/adicionar"
                  component={AddNote}
                />
                <Route
                  exact
                  path="/terapeuta/:id"
                  component={TherapistProfile}
                />
                <Route
                  exact
                  path="/paciente/:patient_id/registo/:note_id"
                  component={TherapeuticNoteDetails}
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
