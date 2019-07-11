import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Therapist.css";

class Therapist extends Component {
  render() {
    const { _id, name, email, specialty, patient } = this.props.therapist;

    const show_patients = patient.slice(0, 2);

    return (
      <div className="row  mb-4">
        <div className="col-md-6">
          <div className="card card-widget widget-user-2">
            <div className="widget-user-header bg-warning">
              <div className="widget-user-image">
                <img
                  className="img-circle elevation-2"
                  src="../dist/img/user7-128x128.jpg"
                  alt="User Avatar"
                />
              </div>
              <h3 className="widget-user-username">
                {" "}
                <Link
                  to={`/terapeuta/${_id}`}
                >
                  {name}
                </Link>
              </h3>
              <h6 className="widget-user-desc">{specialty}</h6>
              <hr />
              <p style={{ textAlign: "center" }}>
                <i className="fas fa-envelope-square"> </i> {email}
              </p>
            </div>
            <div className="card-footer bg-white">
              <div className="row">
                <div className="col-sm-6 border-right">
                  <div className="description-block bg-white">
                    <Link
                      to={`/terapeuta/${_id}`}
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
                    <Link
                      to={`/terapeuta/editar/${_id}`}
                      className="btn bg-white"
                      style={{
                        border: "1px solid",
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          {show_patients.map(user => (
            <div className="info-box mb-3 bg-success">
              <span className="info-box-icon">
                <i className="fas fa-child" />
              </span>
              <div style={{ display: "flex" }}>
                <div style={{ alignSelf: "center" }}><Link to={`/paciente/ver/${user._id}`}>{user.name}</Link></div>
              </div>
            </div>
          ))}
          {show_patients ? (
            patient.length > 2 ? (
              <Link
                to={`/terapeuta/${_id}`}
                className="btn mb-3"
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
    );
  }
}

Therapist.propTypes = {
  therapist: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(Therapist);
