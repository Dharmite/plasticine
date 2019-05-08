import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getTherapists } from "../../actions/therapistActions";
import { getParents } from "../../actions/parentActions";
import { getPatients } from "../../actions/patientActions";

import Therapist from "../therapist/Therapist";
import Parent from "../parent/Parent";
import Patient from "../patient/Patient";

class DashboardAdmin extends Component {
  componentDidMount() {
    this.props.getTherapists();
    this.props.getParents();
    this.props.getPatients();
  }

  render() {
    const { therapists, parents, patients } = this.props;

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Perfil de administrador</h1>
              <p className="lead text-muted">Bem vindo Admin</p>
            </div>
          </div>

          <div className="btn-group mb-4" role="group">
            <Link to="/terapeuta/adicionar" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Criar
              Terapeuta
            </Link>{" "}
            <Link to="/parente/adicionar" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Criar Parente
            </Link>
            <Link to="/paciente/adicionar" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Criar Paciente
            </Link>
          </div>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="therapist-tab"
                data-toggle="tab"
                href="#therapist"
                role="tab"
                aria-controls="therapist"
                aria-selected="true"
              >
                Terapeutas
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="patient-tab"
                data-toggle="tab"
                href="#patient"
                role="tab"
                aria-controls="patient"
                aria-selected="false"
              >
                Pacientes
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="parent-tab"
                data-toggle="tab"
                href="#parent"
                role="tab"
                aria-controls="parent"
                aria-selected="false"
              >
                Parentes
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="therapist"
              role="tabpanel"
              aria-labelledby="therapist-tab"
            >
              {therapists.map(therapist => (
                <Therapist key={therapist.id} therapist={therapist} />
              ))}
            </div>
            <div
              className="tab-pane fade"
              id="patient"
              role="tabpanel"
              aria-labelledby="patient-tab"
            >
              {patients.map(patient => (
                <Patient key={patient.id} patient={patient} />
              ))}
            </div>
            <div
              className="tab-pane fade"
              id="parent"
              role="tabpanel"
              aria-labelledby="parent-tab"
            >
              {parents.map(parent => (
                <Parent key={parent.id} parent={parent} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardAdmin.propTypes = {
  therapists: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  patients: PropTypes.array.isRequired,
  getPatients: PropTypes.func.isRequired,
  getParents: PropTypes.func.isRequired,
  getTherapists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  therapists: state.therapist.therapists,
  parents: state.parent.parents,
  patients: state.patient.patients
});

export default connect(
  mapStateToProps,
  { getTherapists, getParents, getPatients }
)(DashboardAdmin);
