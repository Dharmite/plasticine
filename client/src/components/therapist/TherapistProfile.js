import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTherapist } from "../../actions/therapistActions";
import Resource from "../resources/Resource";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class TherapistProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTherapist(id);
  }

  render() {
    const { name, email, specialty, resources, patient } = this.props.therapist;

    let userType;

    if (this.props.user.userType === "admin") {
      userType = "admin";
    } else if (this.props.user.userType === "therapist") {
      userType = "terapeuta";
    } else {
      userType = "parente";
    }

    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />
              <div className="row">
                <div className="col-6 mt-3 mb-3">
                  <Link
                    to={`/${userType}-dashboard`}
                    className="btn"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white"
                    }}
                  >
                    Voltar
                  </Link>{" "}
                </div>
              </div>

              <div class="container row mb-2">
                <div class="col-sm-6">
                  <h1>Perfil</h1>
                </div>
              </div>

              <section class="content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="card card-primary card-outline">
                        <div class="card-body box-profile">
                          <div class="text-center">
                            <img
                              class="profile-user-img img-responsive img-circle"
                              src="../../dist/img/user4-128x128.jpg"
                              alt="User profile picture"
                            />
                          </div>

                          <h3 class="profile-username text-center">{name}</h3>
                          <p class="text-muted text-center">
                            {email ? (
                              <i className="fas fa-envelope-square"> </i>
                            ) : null}{" "}
                            {email}
                          </p>
                          <hr />
                          <p class="text-muted text-center">{specialty}</p>

                          <ul class="list-group list-group-unbordered mb-3">
                            <li class="list-group-item">
                              <b>Recursos</b>{" "}
                              <a class="float-right">
                                {resources ? resources.length : null}
                              </a>
                            </li>
                            <li class="list-group-item">
                              <b>Crianças</b>{" "}
                              <a class="float-right">
                                {patient ? patient.length : null}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      {resources ? (
                        resources.length > 0 ? (
                          resources.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        ) : (
                          <h3 className="text-center">
                            Sem recursos para mostrar
                          </h3>
                        )
                      ) : null}
                    </div>
                    <div class="col-md-3">
                      <div class="card card-primary card-outline">
                        <div class="card-body box-profile">
                          <h3 class="profile-username text-center">Crianças</h3>

                          <ul class="list-group list-group-unbordered mb-3">
                            {patient ? (
                              patient.length > 0 ? (
                                patient.map(user => (
                                  <li class="list-group-item">
                                    <b>
                                      <Link
                                        style={{ color: "black" }}
                                        to={`/paciente/ver/${user._id}`}
                                      >
                                        {user.name}
                                      </Link>
                                    </b>{" "}
                                  </li>
                                ))
                              ) : (
                                <p>Sem pacientes</p>
                              )
                            ) : null}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

TherapistProfile.propTypes = {
  therapist: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  therapist: state.therapist.therapist
});

export default connect(
  mapStateToProps,
  { getTherapist }
)(TherapistProfile);
