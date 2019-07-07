import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "../layout/Sidebar";

class Patient extends Component {
  render() {
    const { _id, name, age, therapist } = this.props.patient;

    return (
      <div className="row">
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
              <h3 className="widget-user-username">{name}</h3>
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
                      style={{ border: "1px solid", width: "100%", height: "100%"  }}
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
                      style={{ border: "1px solid", width: "100%", height: "100%"  }}
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
          {therapist.map(user => (
            <div className="info-box mb-3 bg-warning">
              <span className="info-box-icon">
                <i className="fas fa-child" />
              </span>
              <div style={{ display: "flex" }}>
                <div style={{ alignSelf: "center" }}>{user.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      // <div className="card card-body bg-light mb-3">
      //   <div className="row">
      //     <div className="col-2">
      //       <img
      //         className="rounded-circle"
      //         style={{ width: "100%" }}
      //         src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
      //         alt=""
      //       />
      //     </div>
      //     <div className="col-lg-6 col-md-12 col-12">
      //       <h3 style={{ marginBottom: "16px" }}>{name}</h3>
      //       <p>
      //         <b>Idade:</b> {age}
      //       </p>

      //       <div className="row">
      //         <div className="col-3">
      //           <Link
      //             to={`/paciente/ver/${_id}`}
      //             className="btn btn-info"
      //             style={{ width: "100%" }}
      //           >
      //             Ver
      //           </Link>
      //         </div>

      //         <div className="col-3">
      //           <Link
      //             to={`/paciente/editar/${_id}`}
      //             className="btn btn-info"
      //             style={{ width: "100%" }}
      //           >
      //             Editar
      //           </Link>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="col-md-4 d-lg-block">
      //       <h4>Terapeutas</h4>
      //       <ul className="list-group">
      //         {therapist.map(user => (
      //           <li className="list-group-item">
      //             <i className="fa fa-check pr-1" />
      //             {user.name}
      //           </li>
      //         ))}
      //       </ul>
      //     </div>
      //   </div>
      // </div>
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
