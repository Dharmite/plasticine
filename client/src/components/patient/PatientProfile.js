import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPatient,
  getPatientTherapists,
  addTherapistPatient,
  removeTherapistPatient
} from "../../actions/patientActions";
import { getTherapists } from "../../actions/therapistActions";

import PropTypes from "prop-types";
import axios from "axios";

class PatientProfile extends Component {
  state = {
    showTherapists: false,
    showParents: false,
    selectedTherapist: "",
    patientTherapists: "",
    errors: {}
  };

  removeTherapist = therapist_id => {
    const { id } = this.props.match.params;

    this.props.removeTherapistPatient(id, therapist_id);
  };

  handleSelectionChanged = e => {
    this.setState({
      selectedTherapist: e.target.value
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPatient(id);
    this.props.getTherapists();
    this.props.getPatientTherapists(id);
  }

  onSubmitTherapist = e => {
    e.preventDefault();

    this.props.addTherapistPatient(
      this.state.selectedTherapist,
      this.props.patient._id
    );
    // axios
    //   .get(`/api/users/therapist/name/${this.state.selectedTherapist}`)
    //   .then(res => {
    //     console.log(res.data._id, "therapist");
    //     axios
    //       .post(
    //         `/api/patient-profile/${this.props.patient._id}/therapist/${
    //           res.data._id
    //         }`
    //       )
    //       .then(resultado => console.log(res.data))
    //       .catch(err => this.setState({ errors: err.response.data }));
    //   })
    //   .catch(err => console.log(err.response.data));
  };

  render() {
    const { showTherapists } = this.state;

    const {
      name,
      age,
      schoolName,
      clinicalStatus,
      therapist,
      previousTherapists,
      parent,
      schoolSchedule,
      medicine
    } = this.props.patient;

    const { therapists } = this.props;
    const { errors } = this.state;

    const { patientTherapists } = this.props;

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                      <div className="col-4 col-md-3 m-auto">
                        <img
                          className="rounded-circle"
                          src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h1 className="display-4 text-center">{name}</h1>
                      <p className="lead text-center">Idade: {age}</p>
                      <p>{schoolName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">
                      Estado clinico de {name}
                    </h3>
                    <p className="lead">{clinicalStatus}</p>
                  </div>
                </div>
              </div>

              <div className="btn-group mb-4" role="group">
                <a
                  className="btn btn-light"
                  onClick={() =>
                    this.setState({
                      showTherapists: !this.state.showTherapists
                    })
                  }
                >
                  <i className="fas fa-user-circle text-info mr-1" /> Associar
                  Terapeuta
                </a>

                <a className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1" /> Associar
                  Parente
                </a>
              </div>

              {showTherapists ? (
                <form
                  className="form-inline mb-3"
                  onSubmit={this.onSubmitTherapist}
                >
                  <div
                    className="form-group mb-2 mr-3"
                    style={{ marginRight: "5px;" }}
                  >
                    <label
                      for="exampleFormControlSelect1"
                      style={{ marginRight: "5px;" }}
                    >
                      Selecione o terapeuta
                    </label>
                    <select
                      className="form-control ml-3"
                      id="exampleFormControlSelect1"
                      onChange={this.handleSelectionChanged}
                    >
                      <option id="option">Escolha um terapeuta</option>
                      {therapists
                        ? therapists.map(elem => (
                            <option id="option">{elem.name}</option>
                          ))
                        : null}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mb-2"
                    style={{ marginRight: "5px;" }}
                  >
                    {" "}
                    Associar terapeuta
                  </button>
                </form>
              ) : null}
              {errors.err ? (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.err}
                </div>
              ) : null}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h3 className="text-center text-info">Parentes</h3>
                  <ul className="list-group">
                    {parent ? (
                      parent.map(elem => (
                        <li className="list-group-item">
                          <h4>{elem.name}</h4>
                          <p>{elem.email}</p>
                        </li>
                      ))
                    ) : (
                      <p> Sem parentes associados </p>
                    )}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h3 className="text-center text-info">Terapeutas</h3>{" "}
                  <ul className="list-group">
                    {patientTherapists ? (
                      patientTherapists.map(elem => (
                        <li className="list-group-item">
                          <i
                            className="fas fa-times"
                            style={{
                              cursor: "pointer",
                              float: "right",
                              color: "red"
                            }}
                            onClick={this.removeTherapist.bind(this, elem._id)}
                          />
                          <h4>{elem.name}</h4>
                          <p>{elem.email}</p>
                          <p>{elem.specialty}</p>
                        </li>
                      ))
                    ) : (
                      <p> Sem terapeutas associados </p>
                    )}
                  </ul>
                </div>
              </div>

              <div>
                <hr />
                <h3 className="mb-4">Medicamentos</h3>
                <div className="card card-body mb-2">
                  <div className="row">
                    {medicine ? (
                      medicine.map(elem => (
                        <div className="col-md-12">
                          <h4>{elem.name}</h4>
                          <p>{elem.observation}</p>
                          <p>{elem.dosage}</p>
                          {/* <p>
                            Medicamento tomado de {startingDate} a{" "}
                            {finishedDate}
                          </p> */}
                          <p>Horario: {elem.time}</p>
                        </div>
                      ))
                    ) : (
                      <p> Sem medicamentos para mostrar </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PatientProfile.propTypes = {
  getPatient: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  therapists: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  patient: state.patient.patient,
  therapists: state.therapist.therapists,
  selectedTherapist: state.therapist.selectedTherapist,
  patientTherapists: state.patient.patientTherapists
});

export default connect(
  mapStateToProps,
  {
    getPatient,
    getTherapists,
    getPatientTherapists,
    addTherapistPatient,
    removeTherapistPatient
  }
)(PatientProfile);
