import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getParent } from "../../actions/parentActions";
import TherapeuticNote from "../therapist/TherapeuticNote";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import user_pic from "../../img/user.png";
import kid from "../../img/kid.png";
import Patient from "../patient/Patient";

class ParentProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getParent(id);
  }

  render() {
    const {
      _id,
      name,
      email,
      notes,
      patient,
      account_status,
      work_status,
      birthday
    } = this.props.parent;

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
                      <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                          <div className="col-lg-2 col-md-2">
                            <img
                              className="img-circle elevation-1"
                              src={user_pic}
                              style={{ height: "128px", width: "128px" }}
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
                            {birthday ? (
                              <p>
                                <b>Idade:</b>{" "}
                                {Math.floor(
                                  (Date.now() - new Date(birthday)) /
                                    1000 /
                                    60 /
                                    60 /
                                    24 /
                                    365
                                )}
                              </p>
                            ) : null}

                            {work_status ? (
                              <p>
                                Situação atual: {work_status}
                              </p>
                            ) : null}
                            {this.props.user.userType == "admin" ? (
                              <Link
                                to={`/parente/editar/${_id}`}
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
                            {notes ? (
                              <h5>Registos criados: {notes.length}</h5>
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
                              src={user_pic}
                              style={{ height: "128px", width: "128px" }}
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
                            {birthday ? (
                              <p>
                                <b>Idade:</b>{" "}
                                {Math.floor(
                                  (Date.now() - new Date(birthday)) /
                                    1000 /
                                    60 /
                                    60 /
                                    24 /
                                    365
                                )}
                              </p>
                            ) : null}

                            {work_status ? (
                              <p>
                                <b>Situação atual:</b> {work_status}
                              </p>
                            ) : null}
                            {this.props.user.userType == "admin" ? (
                              <Link
                              to={`/parente/editar/${_id}`}
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
                            {notes ? (
                              <h5>Registos criados: {notes.length}</h5>
                            ) : null}

                            {patient ? (
                              <h5>
                                Numero de crianças associadas: {patient.length}{" "}
                              </h5>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )
                  ) : null}

                  {/* <div>
                    <h2>Notas</h2>
                  </div> */}
                  <div class="row">
                    {/* <div class="col-md-8">
                      {notes ? (
                        notes.length > 0 ? (
                          notes.map(note => (
                            <TherapeuticNote
                              key={note._id}
                              TherapeuticNote={note}
                            />
                          ))
                        ) : (
                          <h3 className="text-center">
                            Sem notas para mostrar
                          </h3>
                        )
                      ) : null}
                    </div> */}
                    <div class="col-md-12">
                      <h3 class="mb-4">Crianças</h3>

                      <ul className="products-list product-list-in-card">
                        {patient ? (
                          patient.length > 0 ? (
                            patient.map(user => (
                              <Patient key={user.id} patient={user} />

                              // <li class="item">
                              //   <div className="product-img">
                              //     <img
                              //       className="img-circle elevation-1 bg-success"
                              //       src={kid}
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
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

ParentProfile.propTypes = {
  parent: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  parent: state.parent.parent
});

export default connect(
  mapStateToProps,
  { getParent }
)(ParentProfile);
