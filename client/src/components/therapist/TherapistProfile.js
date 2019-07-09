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
                              className="rounded-circle"
                              src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                              alt=""
                            />{" "}
                          </div>

                          <h5 class="profile-username text-center">{name}</h5>
                          <h6 class="text-muted text-center">
                            {email ? (
                              <i className="fas fa-envelope-square"> </i>
                            ) : null}{" "}
                            {email}
                          </h6>
                          <h6 class="text-muted text-center">{specialty}</h6>

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
                    <div class="col-md-9">
                      <div class="card">
                        <div class="card-header p-2">
                          <ul class="nav nav-pills">
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                href="#resources"
                                data-toggle="tab"
                              >
                                Recursos
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="card-body">
                          <div class="tab-content">
                            <div class="active tab-pane" id="resources">
                              <div class="row">
                                <div class="col-md-12">
                                  {resources
                                    ? resources.map(resource => (
                                        <Resource
                                          key={resource._id}
                                          resource={resource}
                                        />
                                      ))
                                    : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 
          <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-center">{name}</h1>
                <p className="lead text-center">{email}</p>
                <p className="lead text-center">{specialty}</p>
              </div>
            </div>
          </div> */}
              {/* <div class="row">
          <div class="col-md-12">
            <h1 class="display-6">Recursos</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            {resources
              ? resources.map(resource => (
                  <Resource key={resource._id} resource={resource} />
                ))
              : null}
          </div>
        </div> */}
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
