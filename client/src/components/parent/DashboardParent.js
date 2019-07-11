import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Patient from "../patient/Patient";


class DashboardParent extends Component {
  render() {
    const { name, patient } = this.props.user;

    let patientContent;
    if(patient){
      patientContent =
      patient.length > 0 ? (
        patient.map(patient => (
          <Patient key={patient.id} patient={patient} />
        ))
      ) : (
        <h6 className="mt-4">Nenhum paciente disponível</h6>
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
                  <h1 className="display-4">Perfil de parente</h1>
                  <p className="lead text-muted">
                    Bem vindo {this.props.user.name}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1">
                      <i class="fas fa-child" />{" "}
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Pacientes</span>
                      <span className="info-box-number">
                        {patient ? patient.length : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="clearfix hidden-md-up" />
              </div>
              <hr />

              {patient ? patientContent : null}

              {/* <div className="row">
                <div className="col-md-12">
                  {patient.length > 0 ? (
                    patient.map(patient => (
                      <div className="card card-body bg-light mb-3">
                        <div className="row">
                          <div className="col-2">
                            <img
                              className="rounded-circle"
                              style={{ width: "100%" }}
                              src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                              alt=""
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 col-12">
                            <h3>{patient.name}</h3>
                            <p>Idade: {patient.age}</p>
                            <p>Escola: {patient.schoolName}</p>

                            <div className="row">
                              <div className="col-3">
                                <Link
                                  to={`/paciente/ver/${patient._id}`}
                                  className="btn btn-info"
                                  style={{ width: "100%" }}
                                >
                                  Ver
                                </Link>
                              </div>

                              <div className="col-5">
                                <Link
                                  to={`/paciente/${
                                    patient._id
                                  }/observação/adicionar`}
                                  className="btn btn-info"
                                  style={{ width: "100%" }}
                                >
                                  Criar observação
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 d-lg-block">
                            <h4>Terapeutas</h4>
                            <ul className="list-group">
                              {patient.therapist.map(user => (
                                <li className="list-group-item">
                                  <i className="fa fa-check pr-1" />
                                  {user.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Sem pacientes</p>
                  )}
                </div>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

DashboardParent.propTypes = {
  therapists: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  patients: PropTypes.array.isRequired,
  getPatients: PropTypes.func.isRequired,
  getParents: PropTypes.func.isRequired,
  getTherapists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  therapists: state.therapist.therapists,
  parents: state.parent.parents,
  patients: state.patient.patients
});

export default connect(
  mapStateToProps,
  null
)(DashboardParent);
