import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getParent } from "../../actions/parentActions";
import TherapeuticNote from "../therapist/TherapeuticNote";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class ParentProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getParent(id);
  }

  render() {
    const { name, email, notes, patient } = this.props.parent;

    console.log(patient, "patient");

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
                  <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                      <div className="col-lg-2 col-md-2">
                        <img
                          className="img-circle elevation-2"
                          src="../dist/img/user7-128x128.jpg"
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
                      </div>

                      <div className="col-lg-4 col-md-4 pl-4">
                        {notes ? (
                          <h5>Numero de notas criados: {notes.length}</h5>
                        ) : null}

                        {patient ? (
                          <h5>
                            Numero de crianças associadas: {patient.length}{" "}
                          </h5>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-8">
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
                    </div>
                    <div class="col-md-4">
                      <div class="card">
                        <div class="card-header">
                          <h3 class="card-title">Crianças</h3>
                        </div>

                        {/* /.card-header */}
                        <div className="card-body p-0">
                          <ul className="products-list product-list-in-card pl-2 pr-2">
                            {patient ? (
                              patient.length > 0 ? (
                                patient.map(user => (
                                  <li class="item">
                                    <div className="product-img">
                                      <img
                                        className="img-circle elevation-2"
                                        src="../dist/img/user7-128x128.jpg"
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
                                <p> Sem parentes associados </p>
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
