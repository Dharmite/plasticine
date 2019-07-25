import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { getTherapist } from "../../actions/therapistActions";
import Patient from "../patient/Patient";

import kid from "../../img/kid.png";


class DashboardTherapist extends Component {
  state = {
    patients: true,
    previousPatients: false
  };

  componentDidMount() {
    this.props.getTherapist(this.props.user.id);
    document.getElementsByClassName("info-box")[0].style.backgroundColor =
      "#E8E8E8";
  }

  render() {
    const { patient, previousPatients } = this.props.therapist;

    let patientContent;
    if (patient) {
      patientContent =
        patient.length > 0 ? (
          patient.map(patient => <Patient key={patient.id} patient={patient} />)
        ) : (
          <h6 className="mt-4">Nenhum utente disponível</h6>
        );
    }

    let previousPatientsContent;
    if (previousPatients) {
      previousPatientsContent =
        previousPatients.length > 0 ? (
          previousPatients.map(patient => (
            <div className="row  mb-5">
              <div className="col-md-10">
                <div
                  className="row card"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div className="col-md-12 col-sm-12 pr-2 pl-2 pt-2 pb-2">
                    <div className="card-widget widget-user-2">
                      <div className="widget-user-header widget-user-header-custom bg-success" style={{height:"auto"}}>
                        <div className="widget-user-image">
                          <img
                            className="img-circle elevation-2 bg-white"
                            src={kid}
                            alt="User Avatar"
                          />
                        </div>
                        <h1 className="widget-user-username">
                          {" "}
                          <b>{patient.name}</b>
                        </h1>
                        <h6 className="widget-user-desc">
                          <b>Idade:</b> {patient.age}
                        </h6>
                        <p className="widget-user-desc">
                          <b>Estado clinico:</b> {patient.clinicalStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6 className="mt-4">Nenhum utente disponível</h6>
        );
    }

    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />

              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4">Perfil de especialista</h1>
                  <p className="lead text-muted">
                    Bem vindo {this.props.user.name}
                  </p>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-12 col-sm-6 col-md-3"
                  onClick={() => {
                    document.getElementsByClassName(
                      "info-box"
                    )[0].style.backgroundColor = "#E8E8E8";
                    document.getElementsByClassName(
                      "info-box"
                    )[1].style.backgroundColor = "white";

                    this.setState({
                      patients: true,
                      previousPatients: false
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1">
                      <i class="fas fa-child" />{" "}
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Utentes atuais</span>
                      <span className="info-box-number">
                        {patient ? patient.length : null}
                      </span>
                    </div>
                  </div>
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

                    this.setState({
                      patients: false,
                      previousPatients: true
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1">
                      <i class="fas fa-child" />{" "}
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Antigos utentes</span>
                      <span className="info-box-number">
                        {previousPatients ? previousPatients.length : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              {this.state.patients ? patientContent : null}
              {this.state.previousPatients ? previousPatientsContent : null}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

DashboardTherapist.propTypes = {
  therapists: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  patients: PropTypes.array.isRequired,
  getPatients: PropTypes.func.isRequired,
  getParents: PropTypes.func.isRequired,
  getTherapists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  therapist: state.therapist.therapist
});

export default connect(
  mapStateToProps,
  { getTherapist }
)(withRouter(DashboardTherapist));
