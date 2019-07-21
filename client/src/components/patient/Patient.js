import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import kid from "../../img/kid.png";

class Patient extends Component {
  render() {
    const { _id, name, therapist, birthday } = this.props.patient;

    let show_therapists = therapist.filter(
      user => user.account_status == "active"
    );
    show_therapists = show_therapists.slice(0, 2);

    return (
      <div className="row  mb-5">
        <div className="col-md-10">
          <div
            className="row card"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="col-md-7 col-sm-12 pr-3 pl-3 pt-3">
              <div className="card-widget widget-user-2">
                <div className="widget-user-header widget-user-header-custom bg-success">
                  <div className="widget-user-image">
                    <img
                      className="img-circle elevation-1"
                      src={kid}
                      alt="User Avatar"
                    />
                  </div>
                  <h3 className="widget-user-username">
                    {" "}
                    <Link to={`/paciente/ver/${_id}`}>{name}</Link>
                  </h3>
                  <h6 className="widget-user-desc">
                    Idade:{" "}
                    {Math.floor(
                      (Date.now() - new Date(birthday)) /
                        1000 /
                        60 /
                        60 /
                        24 /
                        365
                    )}
                  </h6>
                </div>
                <div className="card-footer card-footer-custom bg-white">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="description-block bg-white">
                        <Link
                          to={`/paciente/ver/${_id}`}
                          href="profile.html"
                          className="btn btn bg-white"
                          style={{
                            border: "1px solid",
                            width: "100%",
                            height: "100%"
                          }}
                        >
                          Ver
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="description-block bg-white">
                        {this.props.isAdmin ? (
                          <Link
                            to={`/paciente/editar/${_id}`}
                            className="btn bg-white"
                            style={{
                              border: "1px solid",
                              width: "100%",
                              height: "100%"
                            }}
                          >
                            Editar
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-12 border-left info-box-group pr-3 pl-3 pt-3">
              {show_therapists.map(user => (
                <div
                  className="info-box mb-3 info-box-custom"
                  style={{ backgroundColor: "#FFE4B5" }}
                >
                  <span className="info-box-icon">
                    <i className="fa fa-users" />
                  </span>
                  <div style={{ display: "flex" }}>
                    <div style={{ alignSelf: "center" }}>
                      <Link to={`/terapeuta/${user._id}`}>{user.name}</Link>
                    </div>
                  </div>
                </div>
              ))}

              {show_therapists ? (
                therapist.length == 0 ? (
                  <h4 className="text-center">Sem especialistas</h4>
                ) : null
              ) : null}

              {show_therapists ? (
                therapist.length > 2 ? (
                  <Link
                    to={`/paciente/ver/${_id}`}
                    className="btn mb-3 ver-todos"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white",
                      width: "100%"
                    }}
                  >
                    Ver Todos
                  </Link>
                ) : null
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Patient.propTypes = {
  patient: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(Patient);
