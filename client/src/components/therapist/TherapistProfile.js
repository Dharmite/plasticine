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

              <section class="content">
                <div class="container-fluid">
                  <div className="card card-body bg-warning text-white mb-3">
                    <div className="row">
                      <div className="col-lg-3 col-md-3">
                        <img
                          className="rounded-circle"
                          src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-4 col-md-4 border-right">
                        {name ? <h1 className="display-4">{name}</h1> : null}
                        {email ? <p className="lead">Email: {email}</p> : null}
                        {specialty ? <p>{specialty}</p> : null}
                      </div>

                      <div className="col-lg-4 col-md-4 ">
                        {resources ? <p>Recursos {resources.length}</p> : null}

                        {patient ? <p>Crianças: {patient.length} </p> : null}
                      </div>
                    </div>
                  </div>

                  <div class="row">

                    <div class="col-md-9">
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
