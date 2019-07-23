import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTherapists } from "../../actions/therapistActions";
import { getParents } from "../../actions/parentActions";
import { getPatients } from "../../actions/patientActions";

import Therapist from "../therapist/Therapist";
import Parent from "../parent/Parent";
import Patient from "../patient/Patient";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

import Spinner from "../common/Spinner";

class DashboardAdmin extends Component {
  state = {
    therapist: false,
    patient: true,
    parent: false,
    patient_search: "",
    therapist_search: ""
  };

  componentDidMount() {
    this.props.getTherapists();
    this.props.getParents();
    this.props.getPatients();
    document.getElementsByClassName("info-box")[1].style.backgroundColor =
      "#E8E8E8";
  }

  updateSearch(event) {
    this.setState({ patient_search: event.target.value.substr(0, 20) });
  }

  updateSearchTherapist(event) {
    this.setState({ therapist_search: event.target.value.substr(0, 20) });
  }

  render() {
    const { therapists, parents, patients } = this.props;
    const {
      loading_therapists,
      loading_patients,
      loading_parents
    } = this.props;

    let therapistContent;
    let patientContent;
    let parentContent;

    if (loading_parents == true) {
      parentContent = <Spinner />;
    } else {
      parentContent =
        parents.length > 0 ? (
          parents.map(parent => <Parent key={parent.id} parent={parent} />)
        ) : (
          <h6 className="mt-4">Nenhum parente disponível</h6>
        );
    }
    let filtered_patients;
    let filtered_therapists;


    if (patients) {
      filtered_patients = patients.filter(patient => {
        return patient.name.toLowerCase().indexOf(this.state.patient_search) !== -1;
      });
    }

    if (therapists) {
      filtered_therapists = therapists.filter(therapist => {
        return therapist.name.toLowerCase().indexOf(this.state.therapist_search) !== -1;
      });
    }

    if (loading_patients == true) {
      patientContent = <Spinner />;
    } else {
      patientContent =
        patients.length > 0 ? (
          filtered_patients.map(patient => (
            <Patient key={patient.id} patient={patient} />
          ))
        ) : (
          <h6 className="mt-4">Nenhum utente disponível</h6>
        );
    }

    if (loading_therapists == true) {
      therapistContent = <Spinner />;
    } else {
      therapistContent =
        therapists.length > 0 ? (
          filtered_therapists.map(therapist => (
            <Therapist key={therapist.id} therapist={therapist} />
          ))
        ) : (
          <h6 className="mt-4">Nenhum especialista disponível</h6>
        );
    }

    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />
              <div className="dashboard">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="display-4">Perfil de administrador</h1>
                      <p className="lead text-muted">
                        Bem vindo {this.props.user.name}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-12 col-sm-6 col-md-3 terapeutas"
                      onClick={() => {
                        document.getElementsByClassName(
                          "info-box"
                        )[0].style.backgroundColor = "#E8E8E8";
                        document.getElementsByClassName(
                          "info-box"
                        )[1].style.backgroundColor = "white";
                        // document.getElementsByClassName(
                        //   "info-box"
                        // )[2].style.backgroundColor = "white";

                        this.setState({
                          therapist: true,
                          patient: false,
                          parent: false
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="info-box mb-3 terapeutas">
                        <span
                          className="info-box-icon elevation-1 "
                          style={{ backgroundColor: "#FFE4B5" }}
                        >
                          <i className="fa fa-users" />
                        </span>
                        <div className="info-box-content ">
                          <span className="info-box-text">Especialistas</span>
                          <span className="info-box-number">
                            {therapists ? therapists.length : null}
                          </span>
                        </div>
                      </div>{" "}
                    </div>
                    <div
                      className="col-12 col-sm-6 col-md-3"
                      onClick={() => {
                        document.getElementsByClassName(
                          "info-box"
                        )[0].style.backgroundColor = "white";
                        document.getElementsByClassName(
                          "info-box"
                        )[1].style.backgroundColor = "#E8E8E8";
                        // document.getElementsByClassName(
                        //   "info-box"
                        // )[2].style.backgroundColor = "white";

                        this.setState({
                          therapist: false,
                          patient: true,
                          parent: false
                        });
                      }}
                    >
                      <div
                        className="info-box mb-3"
                        style={{ cursor: "pointer" }}
                      >
                        <span className="info-box-icon bg-success elevation-1">
                          <i class="fas fa-child" />{" "}
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Utentes</span>
                          <span className="info-box-number">
                            {patients ? patients.length : null}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix hidden-md-up" />
                    {/* Comentar a partir daqui */}
                    {/* <div
                      className="col-12 col-sm-6 col-md-3"
                      onClick={() => {
                        document.getElementsByClassName(
                          "info-box"
                        )[0].style.backgroundColor = "white";
                        document.getElementsByClassName(
                          "info-box"
                        )[1].style.backgroundColor = "white";
                        document.getElementsByClassName(
                          "info-box"
                        )[2].style.backgroundColor = "#E8E8E8";

                        this.setState({
                          therapist: false,
                          patient: false,
                          parent: true
                        });
                      }}
                    >
                      <div
                        className="info-box mb-3"
                        style={{ cursor: "pointer" }}
                      >
                        <span className="info-box-icon bg-info elevation-1">
                          <i class="fas fa-user-friends" />{" "}
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Familiares</span>
                          <span className="info-box-number">
                            {parents ? parents.length : null}
                          </span>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="row">
                    <div className="col-10">
                      <hr />
                    </div>
                  </div>

                  {this.state.therapist ? (
                    <div className="row">
                      <div className="col-5">
                    <div
                      class="form-group"
                    >
                      <input
                        type="text"
                        placeholder="Pesquise pelo nome do especialista"
                        value={this.state.therapist_search}
                        onChange={this.updateSearchTherapist.bind(this)}
                        class="form-control"
                      />{" "}
                    </div>
                    </div>
                    </div>
                  ) : null}

                  {this.state.therapist ? therapistContent : null}

                  {this.state.patient ? (
                    <div className="row">
                      <div className="col-5">
                    <div
                      class="form-group"
                    >
                      <input
                        type="text"
                        placeholder="Pesquise pelo nome do utente"
                        value={this.state.patient_search}
                        onChange={this.updateSearch.bind(this)}
                        class="form-control"
                      />{" "}
                    </div>
                    </div>
                    </div>
                  ) : null}
                  {this.state.patient ? patientContent : null}

                  {this.state.parent ? parentContent : null}
                </div>
              </div>
            </div>
          </section>
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
  user: state.auth.user,
  loading_therapists: state.therapist.loading_therapists,
  loading_patients: state.patient.loading_patients,
  loading_parents: state.parent.loading_parents,
  therapists: state.therapist.therapists,
  parents: state.parent.parents,
  patients: state.patient.patients
});

export default connect(
  mapStateToProps,
  { getTherapists, getParents, getPatients }
)(DashboardAdmin);
