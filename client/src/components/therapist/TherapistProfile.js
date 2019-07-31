import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTherapist } from "../../actions/therapistActions";
import Resource from "../resources/Resource";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import doctor_pic from "../../img/doctor.png";
import user_pic from "../../img/user.png";
import kid_pic from "../../img/kid.png";
import Patient from "../patient/Patient";

class TherapistProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTherapist(id);
  }

  render() {
    const {
      _id,
      name,
      email,
      specialty,
      resources,
      patient,
      account_status
    } = this.props.therapist;

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
                  {account_status ? (
                    account_status == "active" ? (
                      <div
                        className="card card-body mb-3"
                        style={{ backgroundColor: "#FFE4B5" }}
                      >
                        <div className="row">
                          <div className="col-lg-2 col-md-2">
                            <img
                              className="img-circle elevation-1"
                              src={doctor_pic}
                              alt="User Avatar"
                            />
                          </div>
                          <div className="col-lg-4 col-md-4 border-right pl-0">
                            {name ? <h3>{name}</h3> : null}
                            {email ? (
                              <p>
                                <i className="fas fa-envelope-square" /> {email}
                              </p>
                            ) : null}
                            {specialty ? <p>{specialty}</p> : null}
                            {this.props.user.userType == "admin" ? (
                              <Link
                                to={`/terapeuta/editar/${_id}`}
                                className="btn bg-white"
                                style={{
                                  border: "1px solid"
                                }}
                              >
                                Editar
                              </Link>
                            ) : null}
                          </div>

                          <div className="col-lg-4 col-md-4 pl-4">
                            {resources ? (
                              <h5>Recursos criados: {resources.length}</h5>
                            ) : null}

                            {patient ? (
                              <h5>Crianças: {patient.length} </h5>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="card card-body bg-secondary text-white mb-3">
                        <div className="row">
                          <div className="col-lg-2 col-md-2">
                            <img
                              className="img-circle elevation-1"
                              src={doctor_pic}
                              alt="User Avatar"
                            />
                          </div>
                          <div className="col-lg-4 col-md-4 border-right pl-0">
                            {name ? <h3>{name}</h3> : null}
                            {email ? (
                              <p>
                                <i className="fas fa-envelope-square" /> {email}
                              </p>
                            ) : null}
                            {specialty ? <p>{specialty}</p> : null}
                            {this.props.user.userType == "admin" ? (
                              <Link
                                to={`/terapeuta/editar/${_id}`}
                                className="btn bg-white"
                                style={{
                                  border: "1px solid"
                                }}
                              >
                                <span style={{ color: "black" }}>Editar</span>
                              </Link>
                            ) : null}
                          </div>

                          <div className="col-lg-4 col-md-4 pl-4">
                            {resources ? (
                              <h5>
                                Numero de recursos criados: {resources.length}
                              </h5>
                            ) : null}

                            {patient ? (
                              <h5>
                                Numero de crianças tratadas: {patient.length}{" "}
                              </h5>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )
                  ) : null}

                  {this.props.user ? (
                    this.props.user.userType == "admin" ? (
                      <div class="row">
                        {/* <div class="col-md-8">
                          <h2>Recursos</h2>
                          {resources ? (
                            resources.length > 0 ? (
                              resources.map(resource => (
                                <Resource
                                  key={resource._id}
                                  resource={resource}
                                />
                              ))
                            ) : (
                              <h3 className="text-center">
                                Sem recursos para mostrar
                              </h3>
                            )
                          ) : null}
                        </div> */}
                        <div class="col-md-12">
                          <h3 class="card-title">Crianças</h3>

                          {/* /.card-header */}
                          <ul className="products-list product-list-in-card">
                            {patient ? (
                              patient.length > 0 ? (
                                patient.map(user => (
                                  <Patient key={user.id} patient={user} />
                                  // <li class="item">
                                  //   <div className="product-img">
                                  //     <img
                                  //       className="img-circle elevation-2"
                                  //       src={kid_pic}
                                  //       alt="User Avatar"
                                  //     />
                                  //   </div>
                                  //   <div className="product-info">
                                  //     <Link
                                  //       style={{ color: "black" }}
                                  //       to={`/paciente/ver/${user._id}`}
                                  //     >
                                  //       {user.name}
                                  //     </Link>
                                  //   </div>
                                  // </li>
                                ))
                              ) : (
                                <p> Sem familiares associados </p>
                              )
                            ) : null}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div class="row">
                        <div class="col-md-8">
                          <h2>Recursos</h2>
                          {resources ? (
                            resources.length > 0 ? (
                              resources.map(resource => (
                                <Resource
                                  key={resource._id}
                                  resource={resource}
                                />
                              ))
                            ) : (
                              <h3 className="text-center">
                                Sem recursos para mostrar
                              </h3>
                            )
                          ) : null}
                        </div>
                        <div class="col-md-4">
                          <h2>Crianças</h2>

                          <div class="card">
                            <div className="card-body p-0">
                              <ul className="products-list product-list-in-card pl-2 pr-2">
                                {patient ? (
                                  patient.length > 0 ? (
                                    patient.map(user => (
                                      <li class="item">
                                        <div className="product-img">
                                          <img
                                            className="img-circle elevation-2"
                                            src={kid_pic}
                                            alt="User Avatar"
                                          />
                                        </div>
                                        <div className="product-info">
                                          <Link
                                            style={{ color: "black" }}
                                            to={`/paciente/ver/${user._id}`}
                                          >
                                            {user.name}
                                          </Link>
                                        </div>
                                      </li>
                                    ))
                                  ) : (
                                    <p> Sem familiares associados </p>
                                  )
                                ) : null}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ) : null}
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
