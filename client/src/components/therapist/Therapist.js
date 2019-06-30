import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Therapist.css";

class Therapist extends Component {
  render() {
    const { _id, name, email, specialty, patient } = this.props.therapist;

    return (
      <div class="card card-body bg-light mb-3">
        <div class="row">
          <div class="col-2">
            <img
              class="rounded-circle"
              style={{ width: "100%" }}
              src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
              alt=""
            />
          </div>
          <div class="col-lg-6 col-md-12 col-12">
            <h3 style ={{marginBottom: "16px"}}>{name}</h3>
            <p><b>Email:</b> {email}</p>
            <p><b>Especialidade clínica:</b> {specialty}</p>

            <div className="row">
              <div className="col-4">
                <Link
                  to = {`/terapeuta/${_id}`}
                  href="profile.html"
                  class="btn btn-info"
                  style={{ width: "100%" }}
                >
                  Ver
                </Link>
              </div>

              <div className="col-4">
                <Link
                  to={`/terapeuta/editar/${_id}`}
                  class="btn btn-info"
                  style={{ width: "100%" }}
                >
                  Editar
                </Link>
              </div>
 
            </div>
          </div>
          <div class="col-md-4 d-lg-block">
            <h4>Pacientes</h4>
            <ul class="list-group">
              {patient.map(user => (
                <li class="list-group-item">
                  <i class="fa fa-check pr-1" />
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
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
