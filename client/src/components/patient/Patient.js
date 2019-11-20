import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import kid from "../../img/kid.png";
import user from "../../img/user.png";
import doctor_pic from "../../img/doctor.png";

class Patient extends Component {
  render() {
    const {
      _id,
      name,
      therapist,
      birthday,
      clinicalStatus
    } = this.props.patient;

    let show_therapists = therapist.filter(
      user => user.account_status === "active"
    );

    // if(show_therapists.length >= 0 && show_therapists.length < 4){
    //   show_therapists = show_therapists.slice(0, 3);
    // }

    if (show_therapists.length > 4) {
      show_therapists = show_therapists.slice(0, 3);
    }
    if (show_therapists.length === 4) {
      show_therapists = show_therapists.slice(0, 4);
    }

    return (
      <div className="row  mb-5">
        <div className="col-md-10 pl-3 pr-3 mt-3">
          <div
            className="row card"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="col-md-7 col-sm-12 pr-3 pl-3 pt-3 pb-3">
              <Link to={`/paciente/ver/${_id}`}>
                <div className="card-widget widget-user-2">
                  <div className="widget-user-header widget-user-header-custom bg-success" style={{height:"auto"}}>
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
                    <p className="mt-3">{clinicalStatus.substring(0, 250)}{clinicalStatus.length > 250?<span>...</span> : null}</p>
                  </div>
                  {/* <div className="card-footer card-footer-custom bg-white">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="description-block bg-white" />
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
                  </div> */}
                </div>
              </Link>
            </div>

            <div className="col-md-5 col-sm-12 border-left info-box-group pr-3 pl-3 pt-3">
              {show_therapists.map(user => (
                <div
                  className="info-box mb-3 info-box-custom p-0"
                  style={{ backgroundColor: "#FFE4B5" }}
                >
                  <span className="info-box-icon">
                    <img
                      className="img-circle elevation-1"
                      src={doctor_pic}
                      alt="User Avatar"
                      style={{ width: "60%" }}
                    />{" "}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>
                      <Link to={`/terapeuta/${user._id}`}>{user.name}</Link>
                    </span>
                    <span>{user.specialty}</span>
                  </div>
                </div>
              ))}

              {show_therapists ? (
                therapist.length === 0 ? (
                  <h4 className="text-center">Sem especialistas</h4>
                ) : null
              ) : null}

              {show_therapists ? (
                therapist.length > 4 ? (
                  <Link
                    to={`/paciente/ver/${_id}`}
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
