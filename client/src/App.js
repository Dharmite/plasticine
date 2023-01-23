import React, { Component } from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser } from './actions/authActions';

import Landing from './components/layout/Landing';
import NotFound from './components/pages/NotFound';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import DashboardAdmin from './components/admin/DashboardAdmin';
import DashboardTherapist from './components/therapist/DashboardTherapist';
import TherapistProfile from './components/therapist/TherapistProfile';
import ParentProfile from './components/parent/ParentProfile';

import DashboardParent from './components/parent/DashboardParent';

import AddTherapist from './components/therapist/AddTherapist';
import AddParent from './components/parent/AddParent';
import AddPatient from './components/patient/AddPatient';

import EditTherapist from './components/therapist/EditTherapist';
import EditParent from './components/parent/EditParent';
import EditPatient from './components/patient/EditPatient';
import EditResource from './components/resources/EditResource';

import AddMedicine from './components/patient/AddMedicine';
import EditMedicine from './components/patient/EditMedicine';

import PatientProfile from './components/patient/PatientProfile';

import AddTherapeuticNote from './components/therapist/AddTherapeuticNote';
import AddClinicalHistory from './components/therapist/AddClinicalHistory';
import TherapeuticNoteDetails from './components/therapist/TherapeuticNoteDetails';
import ClinicalHistoryDetails from './components/therapist/ClinicalHistoryDetails';

import AddNote from './components/parent/AddNote';
import AddResource from './components/therapist/AddResource';
import DashboardResources from './components/resources/DashboardResources';
import ResourceDetails from './components/resources/ResourceDetails';
import ResourcePercepcao from './components/resources/ResourcePercepcao';
import ResourceNumerica from './components/resources/ResourceNumerica';
import ResourceMotricidade from './components/resources/ResourceMotricidade';
import ResourceVerbal from './components/resources/ResourceVerbal';
import ResourceMemoria from './components/resources/ResourceMemoria';
import ResourceEmocional from './components/resources/ResourceEmocional';
import ResourceAVD from './components/resources/ResourceAVD';
import Password from './components/pages/Password';

import EditTherapeuticNote from './components/therapist/EditTherapeuticNote';
import EditClinicalHistory from './components/therapist/EditClinicalHistory';

import './App.css';

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
                    <Route path='/' component={Landing} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Routes>
                        <>
                            <PrivateRoute
                                path='/admin-dashboard'
                                component={DashboardAdmin}
                            />{' '}
                            <PrivateRoute
                                path='/terapeuta-dashboard'
                                component={DashboardTherapist}
                            />
                            <PrivateRoute
                                path='/parente-dashboard'
                                component={DashboardParent}
                            />
                            <PrivateRoute
                                path='/terapeuta/adicionar'
                                component={AddTherapist}
                            />
                            <PrivateRoute
                                path='/parente/adicionar'
                                component={AddParent}
                            />
                            <PrivateRoute
                                path='/paciente/adicionar'
                                component={AddPatient}
                            />
                            <PrivateRoute
                                path='/terapeuta/editar/:id'
                                component={EditTherapist}
                            />
                            <PrivateRoute
                                path='/parente/editar/:id'
                                component={EditParent}
                            />
                            <PrivateRoute
                                path='/paciente/editar/:id'
                                component={EditPatient}
                            />
                            <PrivateRoute
                                path='/paciente/ver/:id'
                                component={PatientProfile}
                            />
                            <PrivateRoute
                                path='/paciente/:id/medicamento/adicionar'
                                component={AddMedicine}
                            />
                            <PrivateRoute
                                path='/paciente/:id/ver/medicamento/editar/:medicamento_id'
                                component={EditMedicine}
                            />
                            <PrivateRoute
                                path='/recurso/adicionar'
                                component={AddResource}
                            />
                            <PrivateRoute
                                path='/recurso/editar/:id'
                                component={EditResource}
                            />
                            <PrivateRoute
                                path='/paciente/:id/registo/adicionar'
                                component={AddTherapeuticNote}
                            />
                            <PrivateRoute
                                path='/paciente/:id/avaliação/adicionar'
                                component={AddClinicalHistory}
                            />
                            <PrivateRoute
                                path='/paciente/:id/observação/adicionar'
                                component={AddNote}
                            />
                            <PrivateRoute
                                path='/terapeuta/:id'
                                component={TherapistProfile}
                            />
                            <PrivateRoute
                                path='/parente/:id'
                                component={ParentProfile}
                            />
                            <PrivateRoute
                                path='/paciente/:patient_id/registo/:note_id'
                                component={TherapeuticNoteDetails}
                            />
                            <PrivateRoute
                                path='/paciente/:patient_id/avaliação/:note_id'
                                component={ClinicalHistoryDetails}
                            />
                            <PrivateRoute
                                path='/paciente/:patient_id/registo/:note_id/editar'
                                component={EditTherapeuticNote}
                            />
                            <PrivateRoute
                                path='/paciente/:patient_id/avaliação/:note_id/editar'
                                component={EditClinicalHistory}
                            />
                            <PrivateRoute
                                path='/recursos'
                                component={DashboardResources}
                            />
                            <PrivateRoute
                                path='/recurso/:id'
                                component={ResourceDetails}
                            />
                            <PrivateRoute
                                path='/recursos/percepcao'
                                component={ResourcePercepcao}
                            />
                            <PrivateRoute
                                path='/recursos/a.numericas'
                                component={ResourceNumerica}
                            />
                            <PrivateRoute
                                path='/recursos/motricidade'
                                component={ResourceMotricidade}
                            />
                            <PrivateRoute
                                path='/recursos/d.verbal'
                                component={ResourceVerbal}
                            />
                            <PrivateRoute
                                path='/recursos/memoria'
                                component={ResourceMemoria}
                            />
                            <PrivateRoute
                                path='/recursos/d.emocional-social'
                                component={ResourceEmocional}
                            />
                            <PrivateRoute
                                path='/recursos/avd'
                                component={ResourceAVD}
                            />
                            <PrivateRoute
                                path='/password'
                                component={Password}
                            />
                            <Route component={NotFound} />
                        </>
                    </Routes>
                </Router>
            </Provider>
        );
    }
}

export default App;
