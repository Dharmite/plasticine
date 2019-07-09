import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "../layout/Sidebar";

class Patient extends Component {
  render() {
    const { _id, name, age, therapist } = this.props.patient;
    const show_therapists = therapist.slice(0, 1);

    return (
      <div className="row  mb-4">
        <div className="col-md-6">
          <div className="card card-widget widget-user-2">
            <div className="widget-user-header bg-success">
              <div className="widget-user-image">
                <img
                  className="img-circle elevation-2"
                  src="../dist/img/user7-128x128.jpg"
                  alt="User Avatar"
                />
              </div>
              <h3 className="widget-user-username">
                {" "}
                <Link to={`/paciente/ver/${_id}`}>{name}</Link>
              </h3>
              <h6 className="widget-user-desc">Idade: {age}</h6>
            </div>
            <div className="card-footer bg-white">
              <div className="row">
                <div className="col-sm-6 border-right">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          {show_therapists.map(user => (
            <div className="info-box mb-3 bg-warning">
              <span className="info-box-icon">
                <i className="fas fa-child" />
              </span>
              <div style={{ display: "flex" }}>
              <div style={{ alignSelf: "center" }}><Link to={`/terapeuta/${user._id}`}>{user.name}</Link></div>
              </div>
            </div>
          ))}
          {show_therapists ? (
            therapist.length > 1 ? (
              <Link
                to={`/paciente/ver/${_id}`}
                href="profile.html"
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

Patient.propTypes = {
  patient: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(Patient);
