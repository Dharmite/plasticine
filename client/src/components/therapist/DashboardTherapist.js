import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class DashboardTherapist extends Component {

  render() {
    const { name, patient } = this.props.user;

    return (
      <div class="container">
        <h1 className="mt-3 mb-3">Dashboard {name}</h1>
        {patient.length > 0 ? (
          patient.map(patient => (
            <div className="card card-body bg-light mb-3">
              <div className="row">
                <div className="col-2">
                  <img
                    className="rounded-circle"
                    style={{ width: "100%" }}
                    src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <h3>{patient.name}</h3>
                  <p>Idade: {patient.age}</p>
                  <p>Escola: {patient.schoolName}</p>

                  <div className="row">
                    <div className="col-3">
                      <Link
                        to={`/paciente/ver/${patient._id}`}
                        class="btn btn-info"
                        style={{ width: "100%" }}
                      >
                        Ver
                      </Link>
                    </div>

                    <div className="col-5">
                      <Link
                        to={`/paciente/${patient._id}/registo/adicionar`}
                        className="btn btn-info"
                        style={{ width: "100%" }}
                      >
                        Criar registo
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 d-lg-block">
                  <h4>Terapeutas</h4>
                  <ul className="list-group">
                    {patient.therapist.map(user => (
                      <li className="list-group-item">
                        <i className="fa fa-check pr-1" />
                        {user.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Sem pacientes</p>
        )}
      </div>
    );
  }
}

DashboardTherapist.propTypes = {
  therapists: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  patients: PropTypes.array.isRequired,
  getPatients: PropTypes.func.isRequired,
  getParents: PropTypes.func.isRequired,
  getTherapists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  null
)(DashboardTherapist);
