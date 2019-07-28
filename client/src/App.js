import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { withRouter } from "react-router";

import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser } from "./actions/authActions";

import Landing from "./components/layout/Landing";
import NotFound from "./components/pages/NotFound";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import DashboardAdmin from "./components/admin/DashboardAdmin";
import DashboardTherapist from "./components/therapist/DashboardTherapist";
import TherapistProfile from "./components/therapist/TherapistProfile";
import ParentProfile from "./components/parent/ParentProfile";

import DashboardParent from "./components/parent/DashboardParent";

import AddTherapist from "./components/therapist/AddTherapist";
import AddParent from "./components/parent/AddParent";
import AddPatient from "./components/patient/AddPatient";

import EditTherapist from "./components/therapist/EditTherapist";
import EditParent from "./components/parent/EditParent";
import EditPatient from "./components/patient/EditPatient";
import EditResource from "./components/resources/EditResource";

import AddMedicine from "./components/patient/AddMedicine";
import EditMedicine from "./components/patient/EditMedicine";

import PatientProfile from "./components/patient/PatientProfile";

import AddTherapeuticNote from "./components/therapist/AddTherapeuticNote";
import AddClinicalHistory from "./components/therapist/AddClinicalHistory";
import TherapeuticNoteDetails from "./components/therapist/TherapeuticNoteDetails";
import ClinicalHistoryDetails from "./components/therapist/ClinicalHistoryDetails";

import AddNote from "./components/parent/AddNote";
import AddResource from "./components/therapist/AddResource";
import DashboardResources from "./components/resources/DashboardResources";
import ResourceDetails from "./components/resources/ResourceDetails";
import ResourcePercepcao from "./components/resources/ResourcePercepcao";
import ResourceNumerica from "./components/resources/ResourceNumerica";
import ResourceMotricidade from "./components/resources/ResourceMotricidade";
import ResourceVerbal from "./components/resources/ResourceVerbal";
import ResourceMemoria from "./components/resources/ResourceMemoria";
import ResourceEmocional from "./components/resources/ResourceEmocional";
import ResourceAVD from "./components/resources/ResourceAVD";
import Password from "./components/pages/Password";

import EditTherapeuticNote from "./components/therapist/EditTherapeuticNote";
import EditClinicalHistory from "./components/therapist/EditClinicalHistory";

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
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute
                exact
                path="/admin-dashboard"
                component={DashboardAdmin}
              />{" "}
              <PrivateRoute
                exact
                path="/terapeuta-dashboard"
                component={DashboardTherapist}
              />
              <PrivateRoute
                exact
                path="/parente-dashboard"
                component={DashboardParent}
              />
              <PrivateRoute
                exact
                path="/terapeuta/adicionar"
                component={AddTherapist}
              />
              <PrivateRoute
                exact
                path="/parente/adicionar"
                component={AddParent}
              />
              <PrivateRoute
                exact
                path="/paciente/adicionar"
                component={AddPatient}
              />
              <PrivateRoute
                exact
                path="/terapeuta/editar/:id"
                component={EditTherapist}
              />
              <PrivateRoute
                exact
                path="/parente/editar/:id"
                component={EditParent}
              />
              <PrivateRoute
                exact
                path="/paciente/editar/:id"
                component={EditPatient}
              />
              <PrivateRoute
                exact
                path="/paciente/ver/:id"
                component={PatientProfile}
              />
              <PrivateRoute
                exact
                path="/paciente/:id/medicamento/adicionar"
                component={AddMedicine}
              />
              <PrivateRoute
                exact
                path="/paciente/:id/ver/medicamento/editar/:medicamento_id"
                component={EditMedicine}
              />
              <PrivateRoute
                exact
                path="/recurso/adicionar"
                component={AddResource}
              />
              <PrivateRoute
                exact
                path="/recurso/editar/:id"
                component={EditResource}
              />
              <PrivateRoute
                exact
                path="/paciente/:id/registo/adicionar"
                component={AddTherapeuticNote}
              />
              <PrivateRoute
                exact
                path="/paciente/:id/avaliação/adicionar"
                component={AddClinicalHistory}
              />
              <PrivateRoute
                exact
                path="/paciente/:id/observação/adicionar"
                component={AddNote}
              />
              <PrivateRoute
                exact
                path="/terapeuta/:id"
                component={TherapistProfile}
              />
              <PrivateRoute
                exact
                path="/parente/:id"
                component={ParentProfile}
              />
              <PrivateRoute
                exact
                path="/paciente/:patient_id/registo/:note_id"
                component={TherapeuticNoteDetails}
              />
              <PrivateRoute
                exact
                path="/paciente/:patient_id/avaliação/:note_id"
                component={ClinicalHistoryDetails}
              />
              <PrivateRoute
                exact
                path="/paciente/:patient_id/registo/:note_id/editar"
                component={EditTherapeuticNote}
              />
              <PrivateRoute
                exact
                path="/paciente/:patient_id/avaliação/:note_id/editar"
                component={EditClinicalHistory}
              />
              <PrivateRoute
                exact
                path="/recursos"
                component={DashboardResources}
              />
              <PrivateRoute
                exact
                path="/recurso/:id"
                component={ResourceDetails}
              />
              <PrivateRoute
                exact
                path="/recursos/percepcao"
                component={ResourcePercepcao}
              />
              <PrivateRoute
                exact
                path="/recursos/a.numericas"
                component={ResourceNumerica}
              />
              <PrivateRoute
                exact
                path="/recursos/motricidade"
                component={ResourceMotricidade}
              />
              <PrivateRoute
                exact
                path="/recursos/d.verbal"
                component={ResourceVerbal}
              />
              <PrivateRoute
                exact
                path="/recursos/memoria"
                component={ResourceMemoria}
              />
              <PrivateRoute
                exact
                path="/recursos/d.emocional-social"
                component={ResourceEmocional}
              />
              <PrivateRoute
                exact
                path="/recursos/avd"
                component={ResourceAVD}
              />
              <PrivateRoute exact path="/password" component={Password} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
