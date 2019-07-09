import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import {
  getPatient,
  getPatientMedicine,
  deleteMedicine,
  getPatientTherapists,
  getPatientParents,
  addTherapistPatient,
  addParentPatient,
  removeTherapistPatient,
  removeParentPatient
} from "../../actions/patientActions";

import { getTherapists } from "../../actions/therapistActions";

import { getParents } from "../../actions/parentActions";

import TherapeuticNote from "../therapist/TherapeuticNote";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class PatientProfile extends Component {
  state = {
    showTherapists: true,
    showParents: false,
    selectedTherapist: "",
    selectedParent: "",
    patientTherapists: "",
    patientParents: "",
    errors: {},
    user_id: ""
  };

  onRemoveUserClick = id => {
    this.setState({ user_id: id });
  };

  removeTherapist = therapist_id => {
    const { id } = this.props.match.params;

    this.props.removeTherapistPatient(id, therapist_id);
  };

  removeParent = parent_id => {
    const { id } = this.props.match.params;

    this.props.removeParentPatient(id, parent_id);
  };

  onDeleteClick = medicine_id => {
    const { id } = this.props.match.params;

    this.props.deleteMedicine(id, medicine_id);
  };

  handleTherapistSelectionChanged = e => {
    this.setState({
      selectedTherapist: e.target.value
    });
  };

  handleParentSelectionChanged = e => {
    this.setState({
      selectedParent: e.target.value
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPatient(id);
    this.props.getTherapists();
    this.props.getParents();
    this.props.getPatientTherapists(id);
    this.props.getPatientParents(id);
    this.props.getPatientMedicine(id);
  }

  onSubmitTherapist = e => {
    e.preventDefault();

    if (
      this.state.selectedTherapist == "Escolha um terapeuta" ||
      this.state.selectedTherapist == ""
    ) {
      this.setState({ errors: { err: "Escolha um utilizador valido" } });
    } else {
      axios
        .get(`/api/users/therapist/name/${this.state.selectedTherapist}`)
        .then(res => {
          let therapist_id = res.data._id;

          let a = true;

          this.props.patientTherapists.forEach(element => {
            if (element._id == therapist_id) {
              this.setState({
                errors: { err: "Utilizador já está associado" }
              });
              a = false;
            }
          });

          if (a) {
            this.props.addTherapistPatient(
              this.state.selectedTherapist,
              this.props.patient._id
            );
            this.setState({ errors: { err: "" } });
          }
        });
    }
  };

  onSubmitParent = e => {
    e.preventDefault();

    if (
      this.state.selectedParent == "Escolha um parente" ||
      this.state.selectedParent == ""
    ) {
      this.setState({ errors: { err: "Escolha um utilizador valido" } });
    } else {
      axios
        .get(`/api/users/parent/name/${this.state.selectedParent}`)
        .then(res => {
          let parent_id = res.data._id;

          let a = true;

          this.props.patientParents.forEach(element => {
            if (element._id == parent_id) {
              this.setState({
                errors: { err: "Utilizador já está associado" }
              });
              a = false;
            }
          });

          if (a) {
            this.props.addParentPatient(
              this.state.selectedParent,
              this.props.patient._id
            );
            this.setState({ errors: { err: "" } });
          }
        });
    }
  };

  render() {
    const { isAdmin, isTherapist, isParent } = this.props.auth;
    const { showTherapists } = this.state;
    const { showParents } = this.state;

    const {
      _id,
      name,
      age,
      schoolName,
      clinicalStatus,
      parent,
      medicine,
      therapeuticNote
    } = this.props.patient;

    const { therapists } = this.props;
    const { parents } = this.props;
    const { errors } = this.state;

    const { patientTherapists } = this.props;
    const { patientParents } = this.props;

    let shared_notes = [];
    let shared = false;
    if (therapeuticNote) {
      therapeuticNote.forEach(note => {
        note.availableTo.forEach(elem => {
          if (
            elem == this.props.auth.user.id &&
            note.user._id !== this.props.auth.user.id
          ) {
            shared_notes.push(note);
            shared = true;
          }
        });
      });
    }

    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />
              <div
                className="modal fade"
                id="removeTherapistModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Atenção!
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Deseja mesmo remover este utilizador?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={this.removeTherapist.bind(
                          this,
                          this.state.user_id
                        )}
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                className="modal fade"
                id="removeParentModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Atenção!
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Deseja mesmo remover este utilizador?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-dismiss="modal"
                        onClick={this.removeParent.bind(
                          this,
                          this.state.user_id
                        )}
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {isAdmin ? (
                <div className="col-md-8 mb-3 pt-3">
                  <Link
                    to="/admin-dashboard"
                    className="btn"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white"
                    }}
                  >
                    Voltar
                  </Link>
                </div>
              ) : null}
              {isTherapist ? (
                <div className="col-md-8 mb-3 pt-3">
                  <Link
                    to="/terapeuta-dashboard"
                    className="btn"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white"
                    }}
                  >
                    Voltar
                  </Link>
                </div>
              ) : null}
              {isParent ? (
                <div className="col-md-8 mb-3 pt-3">
                  <Link
                    to="/parente-dashboard"
                    className="btn"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white"
                    }}
                  >
                    Voltar
                  </Link>
                </div>
              ) : null}
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
                              {name ? (
                                <h1 className="display-4 text-center">
                                  {name}
                                </h1>
                              ) : null}
                              {age ? (
                                <p className="lead text-center">Idade: {age}</p>
                              ) : null}
                              {schoolName ? <p>{schoolName}</p> : null}
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
                      {isTherapist ? (
                        <div className="btn-group mb-4" role="group">
                          <Link
                            className="btn"
                            style={{
                              border: "1px solid black",
                              backgroundColor: "white"
                            }}
                            to={`/paciente/${_id}/registo/adicionar`}
                          >
                            <i className="far fa-clipboard text-info mr-1" />{" "}
                            Criar registo
                          </Link>
                        </div>
                      ) : null}

                      {isTherapist || isParent ? (
                        <div className="mb-5">
                          <ul
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                id="mynotes-tab"
                                data-toggle="tab"
                                href="#mynotes"
                                role="tab"
                                aria-controls="mynotes"
                                aria-selected="true"
                              >
                                Minhas notas
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="availableTo-tab"
                                data-toggle="tab"
                                href="#availableTo"
                                role="tab"
                                aria-controls="availableTo"
                                aria-selected="false"
                              >
                                Partilhado comigo
                              </a>
                            </li>
                          </ul>

                          <div className="tab-content" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              id="mynotes"
                              role="tabpanel"
                              aria-labelledby="mynotes-tab"
                            >
                              {therapeuticNote ? (
                                therapeuticNote.length > 0 ? (
                                  therapeuticNote.map(note =>
                                    note.user._id == this.props.auth.user.id ? (
                                      <TherapeuticNote
                                        key={note.id}
                                        TherapeuticNote={note}
                                      />
                                    ) : null
                                  )
                                ) : (
                                  <p className="mt-4">Sem notas disponíveis</p>
                                )
                              ) : null}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="availableTo"
                              role="tabpanel"
                              aria-labelledby="availableTo-tab"
                            >
                              {therapeuticNote ? (
                                shared == true ? (
                                  therapeuticNote.map(note =>
                                    note.availableTo.map(elem =>
                                      elem == this.props.auth.user.id &&
                                      note.user._id !==
                                        this.props.auth.user.id ? (
                                        <TherapeuticNote
                                          key={note.id}
                                          TherapeuticNote={note}
                                        />
                                      ) : null
                                    )
                                  )
                                ) : (
                                  <p className="mt-4">Sem notas disponíveis</p>
                                )
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {isAdmin ? (
                        <div
                          className="btn-group mb-4"
                          role="group"
                          id="associateUser"
                        >
                          <a
                            className="btn btn-light"
                            style={{ border: "1px solid black" }}
                            onClick={() =>
                              this.setState({
                                showTherapists: true,
                                showParents: false
                              })
                            }
                          >
                            <i className="fas fa-user-circle text-info mr-1" />{" "}
                            Associar Terapeuta
                          </a>

                          <a
                            className="btn btn-light"
                            style={{ border: "1px solid black" }}
                            onClick={() =>
                              this.setState({
                                showParents: true,
                                showTherapists: false
                              })
                            }
                          >
                            <i className="fas fa-user-circle text-info mr-1" />{" "}
                            Associar Parente
                          </a>
                        </div>
                      ) : null}

                      {showTherapists && isAdmin ? (
                        <form
                          className="form-inline mb-3"
                          onSubmit={this.onSubmitTherapist}
                        >
                          <div
                            className="form-group mb-2 mr-3"
                            style={{ marginRight: "5px" }}
                          >
                            <label
                              htmlFor="exampleFormControlSelect1"
                              style={{ marginRight: "5px" }}
                            >
                              Selecione o terapeuta
                            </label>
                            <select
                              className="form-control ml-3"
                              id="exampleFormControlSelect1"
                              onChange={this.handleTherapistSelectionChanged}
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

                      {showParents ? (
                        <form
                          className="form-inline mb-3"
                          onSubmit={this.onSubmitParent}
                        >
                          <div
                            className="form-group mb-2 mr-3"
                            style={{ marginRight: "5px;" }}
                          >
                            <label
                              for="exampleFormControlSelect1"
                              style={{ marginRight: "5px;" }}
                            >
                              Selecione o parente
                            </label>
                            <select
                              className="form-control ml-3"
                              id="exampleFormControlSelect1"
                              onChange={this.handleParentSelectionChanged}
                            >
                              <option id="option">Escolha um parente</option>
                              {parents
                                ? parents.map(elem => (
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
                            Associar parente
                          </button>
                        </form>
                      ) : null}

                      {errors.err ? (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.err}
                        </div>
                      ) : null}
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <h3 className="text-center text-info">Parentes</h3>
                          <ul className="list-group">
                            {patientParents.length > 0 ? (
                              patientParents.map(elem => (
                                <li className="list-group-item">
                                  {isAdmin ? (
                                    <i
                                      onClick={this.onRemoveUserClick.bind(
                                        this,
                                        elem._id
                                      )}
                                      className="fas fa-times"
                                      data-toggle="modal"
                                      data-target="#removeParentModal"
                                      style={{
                                        cursor: "pointer",
                                        float: "right",
                                        color: "red"
                                      }}
                                    />
                                  ) : null}

                                  <h4>{elem.name}</h4>
                                  <p>
                                    <b>Email: </b>
                                    {elem.email}
                                  </p>
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
                            {patientTherapists.length > 0 ? (
                              patientTherapists.map(elem => (
                                <li className="list-group-item">
                                  {isAdmin ? (
                                    <i
                                      onClick={this.onRemoveUserClick.bind(
                                        this,
                                        elem._id
                                      )}
                                      className="fas fa-times"
                                      data-toggle="modal"
                                      data-target="#removeTherapistModal"
                                      style={{
                                        cursor: "pointer",
                                        float: "right",
                                        color: "red"
                                      }}
                                    />
                                  ) : null}

                                  <h4>{elem.name}</h4>
                                  <p>
                                    <b>Email: </b>
                                    {elem.email}
                                  </p>
                                  <p>
                                    <b>Especialidade: </b>
                                    {elem.specialty}
                                  </p>
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
                        <div className="btn-group mb-4" role="group">
                          <Link
                            to={`/paciente/${_id}/medicamento/adicionar`}
                            className="btn"
                            style={{border: "1px solid black", backgroundColor:"white"}}
                          >
                            <i className="far fa-clipboard text-info mr-1" />{" "}
                            Adicionar medicamento
                          </Link>
                        </div>
                        <div className="row">
                          {typeof medicine !== "undefined" &&
                          medicine.length > 0 ? (
                            medicine.map(elem => (
                              <div className="col-md-6">
                                <div className="card card-body mb-2">
                                  <h4>
                                    {elem.name}{" "}
                                    <Link
                                      to={`/paciente/${_id}/ver/medicamento/editar/${
                                        elem._id
                                      }`}
                                    >
                                      <i
                                        className="fas fa-pencil-alt"
                                        style={{
                                          cursor: "pointer",
                                          float: "right",
                                          color: "black"
                                        }}
                                      />
                                    </Link>
                                    <i
                                      className="fas fa-times"
                                      style={{
                                        cursor: "pointer",
                                        float: "right",
                                        color: "red",
                                        fontSize: "12px"
                                      }}
                                      onClick={this.onDeleteClick.bind(
                                        this,
                                        elem._id
                                      )}
                                    >
                                      {" "}
                                      Apagar
                                    </i>
                                  </h4>
                                  <p>
                                    <b>Observações:</b> {elem.observation}
                                  </p>
                                  <p>
                                    <b>Dosagem:</b> {elem.dosage}
                                  </p>
                                  <p>
                                    <b>Horario:</b> {elem.time}
                                  </p>
                                  {elem.startingDate ? (
                                    <p>
                                      <b>Inicio:</b>{" "}
                                      {elem.startingDate.slice(0, 10)}
                                    </p>
                                  ) : null}
                                  {elem.finishedDate ? (
                                    <p>
                                      <b>Fim:</b>{" "}
                                      {elem.finishedDate.slice(0, 10)}
                                    </p>
                                  ) : null}
                                </div>
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
          </section>
        </div>
      </div>
    );
  }
}

PatientProfile.propTypes = {
  getPatient: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  therapists: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  patient: state.patient.patient,
  therapists: state.therapist.therapists,
  parents: state.parent.parents,
  selectedTherapist: state.therapist.selectedTherapist,
  patientTherapists: state.patient.patientTherapists,
  selectedParent: state.parent.selectedParent,
  patientParents: state.patient.patientParents,
  loading_patientTherapists: state.patient.loading_patientTherapists,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getPatient,
    getTherapists,
    getParents,
    getPatientTherapists,
    getPatientParents,
    addTherapistPatient,
    addParentPatient,
    removeTherapistPatient,
    removeParentPatient,
    getPatientMedicine,
    deleteMedicine,
    getPatientMedicine
  }
)(withRouter(PatientProfile));
