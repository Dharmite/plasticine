import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import kid from "../../img/kid.png";
import user from "../../img/user.png";
import doctor_pic from "../../img/doctor.png";

import "./Therapist.css";

class Therapist extends Component {
  render() {
    const {
      _id,
      name,
      email,
      specialty,
      patient,
      account_status
    } = this.props.therapist;

    let show_patients = patient;
    if (show_patients.length > 4) {
      show_patients = show_patients.slice(0, 3);
    }
    if (show_patients.length === 4) {
      show_patients = show_patients.slice(0, 4);
    }

    return (
      <div className="row  mb-5">
        <div className="col-md-10 pl-3 pr-3 mt-3">
          <div
            className="row card"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="col-md-7 col-sm-12 pr-3 pl-3 pt-3 pb-3">
              <Link to={`/terapeuta/${_id}`}>
                <div className="card-widget widget-user-2">
                  {account_status ? (
                    account_status === "active" ? (
                      <div
                        className="widget-user-header widget-user-header-custom"
                        style={{ backgroundColor: "#FFE4B5", color:"black" }}
                      >
                        <div className="widget-user-image">
                          <img
                            className="img-circle elevation-1"
                            src={doctor_pic}
                            alt="User Avatar"
                          />
                          {/* <i className="fa fa-users img-circle elevation-2" style={{fontSize:"28px"}}/> */}
                        </div>
                        <h3 className="widget-user-username">
                          {" "}
                          <Link to={`/terapeuta/${_id}`} style={{color:"black"}}>{name}</Link>
                        </h3>
                        <h6 className="widget-user-desc">{specialty}</h6>
                        <p className="widget-user-desc">
                          <i className="fas fa-envelope-square"> </i> {email}
                        </p>
                      </div>
                    ) : (
                      <div className="widget-user-header widget-user-header-custom bg-secondary">
                        <div className="widget-user-image">
                          <img
                            className="img-circle elevation-1"
                            src={doctor_pic}
                            alt="User Avatar"
                          />
                        </div>
                        <h3 className="widget-user-username">
                          {" "}
                          <Link to={`/terapeuta/${_id}`}>{name}</Link>
                        </h3>
                        <h6 className="widget-user-desc">{specialty}</h6>
                        <p className="widget-user-desc">
                          <i className="fas fa-envelope-square"> </i> {email}
                        </p>
                        <p className="widget-user-desc">Conta desativada</p>
                      </div>
                    )
                  ) : null}
                  {/* <div className="widget-user-header widget-user-header-custom bg-warning">
                  <div className="widget-user-image">
                    <img
                      className="img-circle elevation-2"
                      src="../dist/img/user7-128x128.jpg"
                      alt="User Avatar"
                    />
                  </div>
                  <h3 className="widget-user-username">
                    {" "}
                    <Link to={`/terapeuta/${_id}`}>{name}</Link>
                  </h3>
                  <h6 className="widget-user-desc">{specialty}</h6>
                  <p className="widget-user-desc">
                    <i className="fas fa-envelope-square"> </i> {email}
                  </p>
                </div> */}
                </div>
              </Link>
            </div>
            <div className="col-md-5 col-sm-12 border-left info-box-group pr-3 pl-3 pt-3">
              {show_patients.map(user => (
                <div className="info-box mb-3 bg-success info-box-custom p-0">
                  <span className="info-box-icon">
                    <img
                      className="img-circle elevation-1"
                      src={kid}
                      alt="User Avatar"
                      style={{ width: "60%" }}
                    />{" "}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>
                      <Link to={`/paciente/ver/${user._id}`}>{user.name}</Link>
                    </span>
                    <span>
                      Idade:{" "}
                      {Math.floor(
                        (Date.now() - new Date(user.birthday)) /
                          1000 /
                          60 /
                          60 /
                          24 /
                          365
                      )}
                    </span>
                  </div>
                </div>
              ))}

              {show_patients ? (
                patient.length === 0 ? (
                  <h4 className="text-center">Sem utentes</h4>
                ) : null
              ) : null}

              {show_patients ? (
                patient.length > 4 ? (
                  <Link
                    to={`/terapeuta/${_id}`}
                    className="btn mb-3 ver-todos"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white",
                      width: "100%",
                      marginTop: "12px"
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

Therapist.propTypes = {
  therapist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(Therapist);
