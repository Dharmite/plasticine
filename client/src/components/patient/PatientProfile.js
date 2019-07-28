import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import kid from "../../img/kid.png";
import user from "../../img/user.png";
import doctor_pic from "../../img/doctor.png";

import {
  getPatient,
  getPatientMedicine,
  deleteMedicine,
  getPatientTherapists,
  getPatientParents,
  addTherapistPatient,
  addParentPatient,
  removeTherapistPatient,
  removeParentPatient,
  deleteTherapistPatient
} from "../../actions/patientActions";

import { getTherapists } from "../../actions/therapistActions";

import { getParents } from "../../actions/parentActions";

import TherapeuticNote from "../therapist/TherapeuticNote";
import ClinicalHistory from "../therapist/ClinicalHistory";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class PatientProfile extends Component {
  state = {
    showTherapists: false,
    showParents: false,
    selectedTherapist: "",
    selectedParent: "",
    patientTherapists: "",
    patientParents: "",
    errors: {},
    user_id: "",
    isChecked: true,
    selectedMedicine_id: ""
  };

  onRemoveUserClick = id => {
    this.setState({ user_id: id });
  };

  removeMedicineOnClick = medicine_id => {
    this.setState({ selectedMedicine_id: medicine_id });
  };

  onDeleteClick = medicine_id => {
    const { id } = this.props.match.params;

    this.props.deleteMedicine(id, medicine_id);
  };

  removeTherapist = therapist_id => {
    if (this.state.isChecked) {
      const { id } = this.props.match.params;
      let logged_user = this.props.auth.user.id;
      this.props.removeTherapistPatient(
        logged_user,
        id,
        therapist_id,
        this.props.history
      );
    } else {
      const { id } = this.props.match.params;
      this.props.deleteTherapistPatient(id, therapist_id);
    }
  };

  removeParent = parent_id => {
    const { id } = this.props.match.params;

    this.props.removeParentPatient(id, parent_id);
  };

  handleChange = e => {
    this.setState({ isChecked: !this.state.isChecked });
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
      this.state.selectedTherapist == "Escolha um especialista" ||
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
            this.setState({
              errors: { err: "" },
              showParents: false,
              showTherapists: false
            });
            document.getElementById(
              "associateTherapist"
            ).style.backgroundColor = "white";
          }
        });
    }
  };

  onSubmitParent = e => {
    e.preventDefault();

    if (
      this.state.selectedParent == "Escolha um familiar" ||
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
            this.setState({
              errors: { err: "" },
              showParents: false,
              showTherapists: false
            });
            document.getElementById("associateParent").style.backgroundColor =
              "white";
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
      birthday,
      schoolName,
      clinicalStatus,
      parent,
      medicine,
      history,
      observation,
      therapeuticNote,
      clinicalHistory
    } = this.props.patient;

    console.log(clinicalHistory, "clinicalHistory");

    let { therapists } = this.props;

    therapists = therapists.filter(user => user.account_status == "active");

    let { parents } = this.props;
    parents = parents.filter(user => user.account_status == "active");

    const { errors } = this.state;

    let { patientTherapists } = this.props;
    let { patientParents } = this.props;

    patientParents = patientParents.filter(
      user => user.account_status == "active"
    );
    patientTherapists = patientTherapists.filter(
      user => user.account_status == "active"
    );

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

    let shared_notes_clinical = [];
    let shared_clinical = false;
    if (clinicalHistory) {
      clinicalHistory.forEach(note => {
        note.availableTo.forEach(elem => {
          if (
            elem == this.props.auth.user.id &&
            note.user._id !== this.props.auth.user.id
          ) {
            shared_notes_clinical.push(note);
            shared_clinical = true;
          }
        });
      });
    }

    let therapist_auth = false;
    let parent_auth = false;

    if (this.props.auth) {
      if (this.props.auth.user.userType == "therapist") {
        patientTherapists.forEach(element => {
          if (element._id == this.props.auth.user.id) {
            therapist_auth = true;
          }
        });
      }

      if (this.props.auth.user.userType == "parent") {
        patientParents.forEach(element => {
          if (element._id == this.props.auth.user.id) {
            parent_auth = true;
          }
        });
      }
    }

    if (
      therapist_auth == true ||
      parent_auth == true ||
      this.props.auth.user.userType == "admin"
    ) {
      if (
        therapist_auth == true ||
        parent_auth == true ||
        this.props.auth.user.userType == "admin"
      ) {
        return (
          <div>
            <Navbar />
            <div class="content-wrapper">
              <section class="content">
                <div class="container-fluid">
                  <Sidebar />
                  <div
                    className="modal fade"
                    id="removeMedicineModal"
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
                          Deseja mesmo remover este medicamento?
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
                            onClick={this.onDeleteClick.bind(
                              this,
                              this.state.selectedMedicine_id
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
                          <p className="mb-3">
                            Deseja mesmo remover este utilizador?
                          </p>

                          <span className="mr-2">
                            Guardar este utilizador no historial da criança
                          </span>

                          <input
                            value={this.state.isChecked}
                            defaultChecked={this.state.isChecked}
                            onChange={this.handleChange}
                            id="isChecked"
                            type="checkbox"
                            class="flat-red"
                            name="isChecked"
                          />
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
                            Desassociar
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
                            className="btn btn-danger"
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
                  <div className="profile">
                    <div className="container">
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
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card card-body bg-success text-white mb-3">
                            <div className="row">
                              <div className="col-lg-2 col-md-2">
                                <img
                                  className="img-circle elevation-1"
                                  style={{ height: "auto", width: "100%" }}
                                  src={kid}
                                  alt="User Avatar"
                                />
                              </div>
                              <div className="col-lg-4 col-md-4">
                                {name ? <h3>{name}</h3> : null}
                                {birthday ? (
                                  <p>
                                    <b>Idade:</b>{" "}
                                    {Math.floor(
                                      (Date.now() - new Date(birthday)) /
                                        1000 /
                                        60 /
                                        60 /
                                        24 /
                                        365
                                    )}
                                  </p>
                                ) : null}
                                {schoolName ? (
                                  <p>
                                    <b>Escola:</b> {schoolName}
                                  </p>
                                ) : null}
                                {isAdmin || isTherapist ? (
                                  <button
                                    className="btn bg-white"
                                    style={{
                                      border: "1px solid black"
                                    }}
                                  >
                                    <Link to={`/paciente/editar/${_id}`}>
                                      <span style={{ color: "black" }}>
                                        Editar
                                      </span>
                                    </Link>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <div className="card card-body bg-light mb-3">
                                <h3 className="text-info">
                                  Estado Clínico {name}
                                </h3>
                                <p className="lead">{clinicalStatus}</p>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <div className="card card-body bg-light mb-3">
                                <h3 className="text-info">Observações</h3>
                                <p className="lead">{observation}</p>
                              </div>
                            </div>
                          </div>

                          {isAdmin ? (
                            <div
                              className="btn-group mb-4"
                              role="group"
                              id="associateUser"
                            >
                              <a
                                className="btn"
                                id="associateTherapist"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white"
                                }}
                                onClick={() => {
                                  this.setState(
                                    {
                                      showTherapists: !this.state
                                        .showTherapists,
                                      showParents: false
                                    },
                                    () => {
                                      if (this.state.showTherapists == true) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "#E8E8E8";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "white";
                                      }
                                      if (this.state.showParents == true) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "white";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "#E8E8E8";
                                      }
                                      if (
                                        this.state.showParents == false &&
                                        this.state.showTherapists == false
                                      ) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "white";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "white";
                                      }
                                    }
                                  );
                                }}
                              >
                                <i className="fas fa-user-circle text-info mr-1" />{" "}
                                Associar Especialista
                              </a>

                              <a
                                className="btn"
                                id="associateParent"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white"
                                }}
                                onClick={() => {
                                  this.setState(
                                    {
                                      showParents: !this.state.showParents,
                                      showTherapists: false
                                    },
                                    () => {
                                      if (this.state.showTherapists == true) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "#E8E8E8";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "white";
                                      }
                                      if (this.state.showParents == true) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "white";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "#E8E8E8";
                                      }
                                      if (
                                        this.state.showParents == false &&
                                        this.state.showTherapists == false
                                      ) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "white";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "white";
                                      }
                                    }
                                  );
                                }}
                              >
                                <i className="fas fa-user-circle text-info mr-1" />{" "}
                                Associar Familiar
                              </a>

                              {/* <Link
                                className="btn"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white",
                                  color: "black"
                                }}
                                to={`/paciente/${_id}/medicamento/adicionar`}
                              >
                                <i className="fas fa-pills text-info mr-1" />{" "}
                                Adicionar medicamento
                              </Link> */}
                            </div>
                          ) : null}

                          {isTherapist ? (
                            <div
                              className="btn-group mb-4"
                              role="group"
                              id="associateUser"
                            >
                              <a
                                className="btn"
                                id="associateTherapist"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white"
                                }}
                                onClick={() => {
                                  this.setState(
                                    {
                                      showTherapists: !this.state
                                        .showTherapists,
                                      showParents: false
                                    },
                                    () => {
                                      if (this.state.showTherapists == true) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "#E8E8E8";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "white";
                                      }
                                      if (this.state.showParents == true) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "white";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "#E8E8E8";
                                      }
                                      if (
                                        this.state.showParents == false &&
                                        this.state.showTherapists == false
                                      ) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "white";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "white";
                                      }
                                    }
                                  );
                                }}
                              >
                                <i className="fas fa-user-circle text-info mr-1" />{" "}
                                Associar Especialista
                              </a>
                              <a
                                className="btn"
                                id="associateParent"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white"
                                }}
                                onClick={() => {
                                  this.setState(
                                    {
                                      showParents: !this.state.showParents,
                                      showTherapists: false
                                    },
                                    () => {
                                      if (this.state.showTherapists == true) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "#E8E8E8";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "white";
                                      }
                                      if (this.state.showParents == true) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "white";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "#E8E8E8";
                                      }
                                      if (
                                        this.state.showParents == false &&
                                        this.state.showTherapists == false
                                      ) {
                                        document.getElementById(
                                          "associateTherapist"
                                        ).style.backgroundColor = "white";
                                        document.getElementById(
                                          "associateParent"
                                        ).style.backgroundColor = "white";
                                      }
                                    }
                                  );
                                }}
                              >
                                <i className="fas fa-user-circle text-info mr-1" />{" "}
                                Associar Familiar
                              </a>{" "}
                              <Link
                                className="btn"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white",
                                  color: "black"
                                }}
                                to={`/paciente/${_id}/registo/adicionar`}
                              >
                                <i className="far fa-clipboard text-info mr-1" />{" "}
                                Criar Registo
                              </Link>
                              <Link
                                className="btn"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white",
                                  color: "black"
                                }}
                                to={`/paciente/${_id}/avaliação/adicionar`}
                              >
                                <i className="far fa-clipboard text-info mr-1" />{" "}
                                Criar Historial Clínico
                              </Link>
                              <Link
                                to={`/paciente/${_id}/medicamento/adicionar`}
                                className="btn"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white",
                                  color: "black"
                                }}
                              >
                                <i className="fas fa-pills text-info mr-1" />{" "}
                                Adicionar Medicamento
                              </Link>
                            </div>
                          ) : null}

                          {isParent ? (
                            <div
                              className="btn-group mb-4"
                              role="group"
                              id="associateUser"
                            >
                              <Link
                                className="btn"
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "white",
                                  color: "black"
                                }}
                                to={`/paciente/${_id}/registo/adicionar`}
                              >
                                <i className="far fa-clipboard text-info mr-1" />{" "}
                                Criar registo
                              </Link>
                            </div>
                          ) : null}

                          {showTherapists ? (
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
                                  Selecione o especialista
                                </label>
                                <select
                                  className="form-control ml-3"
                                  id="exampleFormControlSelect1"
                                  onChange={
                                    this.handleTherapistSelectionChanged
                                  }
                                >
                                  <option id="option">
                                    Escolha um especialista
                                  </option>
                                  {therapists
                                    ? therapists.map(elem => (
                                        <option id="option">{elem.name}</option>
                                      ))
                                    : null}
                                </select>
                              </div>

                              {this.state.selectedTherapist !==
                                "Escolha um especialista" &&
                              this.state.selectedTherapist !== "" ? (
                                <button
                                  type="submit"
                                  className="btn btn-primary mb-2"
                                  style={{ marginRight: "5px;" }}
                                >
                                  {" "}
                                  Associar especialista
                                </button>
                              ) : null}
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
                                  Selecione o familiar
                                </label>
                                <select
                                  className="form-control ml-3"
                                  id="exampleFormControlSelect1"
                                  onChange={this.handleParentSelectionChanged}
                                >
                                  <option id="option">
                                    Escolha um familiar
                                  </option>
                                  {parents
                                    ? parents.map(elem => (
                                        <option id="option">{elem.name}</option>
                                      ))
                                    : null}
                                </select>
                              </div>

                              {this.state.selectedParent !==
                                "Escolha um familiar" &&
                              this.state.selectedParent !== "" ? (
                                <button
                                  type="submit"
                                  className="btn btn-primary mb-2"
                                  style={{ marginRight: "5px;" }}
                                >
                                  {" "}
                                  Associar familiar
                                </button>
                              ) : null}
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

                          <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                              {isTherapist ? (
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
                                        Registos
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
                                        Registos partilhados
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="myclinical-tab"
                                        data-toggle="tab"
                                        href="#myclinical"
                                        role="tab"
                                        aria-controls="myclinical"
                                        aria-selected="true"
                                      >
                                        Historial
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="clinicalAvailableTo-tab"
                                        data-toggle="tab"
                                        href="#clinicalAvailableTo"
                                        role="tab"
                                        aria-controls="clinicalAvailableTo"
                                        aria-selected="false"
                                      >
                                        Historial Partilhado
                                      </a>
                                    </li>

                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="medicamentos-tab"
                                        data-toggle="tab"
                                        href="#medicamentos"
                                        role="tab"
                                        aria-controls="medicamentos"
                                        aria-selected="false"
                                      >
                                        Medicamentos
                                      </a>
                                    </li>
                                  </ul>

                                  <div
                                    className="tab-content"
                                    id="myTabContent"
                                  >
                                    <div
                                      className="tab-pane fade show active"
                                      id="mynotes"
                                      role="tabpanel"
                                      aria-labelledby="mynotes-tab"
                                    >
                                      {therapeuticNote ? (
                                        therapeuticNote.length > 0 ? (
                                          therapeuticNote.map(note =>
                                            note.user._id ==
                                            this.props.auth.user.id ? (
                                              <TherapeuticNote
                                                key={note.id}
                                                TherapeuticNote={note}
                                              />
                                            ) : null
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
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
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div>

                                    <div
                                      className="tab-pane fade"
                                      id="myclinical"
                                      role="tabpanel"
                                      aria-labelledby="myclinical-tab"
                                    >
                                      {clinicalHistory ? (
                                        clinicalHistory.length > 0 ? (
                                          clinicalHistory.map(note =>
                                            note.user._id ==
                                            this.props.auth.user.id ? (
                                              <ClinicalHistory
                                                key={note.id}
                                                ClinicalHistory={note}
                                              />
                                            ) : null
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div>

                                    <div
                                      className="tab-pane fade"
                                      id="clinicalAvailableTo"
                                      role="tabpanel"
                                      aria-labelledby="clinicalAvailableTo-tab"
                                    >
                                      {clinicalHistory ? (
                                        shared_clinical == true ? (
                                          clinicalHistory.map(note =>
                                            note.availableTo.map(elem =>
                                              elem == this.props.auth.user.id &&
                                              note.user._id !==
                                                this.props.auth.user.id ? (
                                                <ClinicalHistory
                                                  key={note.id}
                                                  ClinicalHistory={note}
                                                />
                                              ) : null
                                            )
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div>

                                    <div
                                      className="tab-pane fade"
                                      id="medicamentos"
                                      role="tabpanel"
                                      aria-labelledby="medicamentos-tab"
                                    >
                                      <div>
                                        <div className="row">
                                          {typeof medicine !== "undefined" &&
                                          medicine.length > 0 ? (
                                            medicine.map(elem => (
                                              <div className="col-md-12">
                                                <div className="card card-body mb-2">
                                                  <h2>{elem.name} </h2>{" "}
                                                  <Link
                                                    to={`/terapeuta/${
                                                      elem.user_id
                                                    }`}
                                                    style={{ color: "black" }}
                                                  >
                                                    <h5>
                                                      Criado por:{" "}
                                                      {elem
                                                        ? elem.user_name
                                                        : null}
                                                    </h5>
                                                  </Link>
                                                  <p>
                                                    {" "}
                                                    {elem.startingDate ? (
                                                      <span className="mr-3">
                                                        <b>Inicio da toma:</b>{" "}
                                                        {elem.startingDate.slice(
                                                          0,
                                                          10
                                                        )}{" "}
                                                      </span>
                                                    ) : null}
                                                    {elem.finishedDate ? (
                                                      <span>
                                                        <b>Fim da toma:</b>{" "}
                                                        {elem.finishedDate.slice(
                                                          0,
                                                          10
                                                        )}{" "}
                                                      </span>
                                                    ) : null}
                                                    {new Date(Date.now()) >
                                                    new Date(
                                                      new Date(
                                                        elem.finishedDate
                                                      )
                                                    ) ? (
                                                      <span>
                                                        (Medicação Suspensa)
                                                      </span>
                                                    ) : null}
                                                  </p>
                                                  <p>
                                                    <b>Observações:</b>{" "}
                                                    {elem.observation}
                                                  </p>
                                                  <p>
                                                    <b>Dosagem:</b>{" "}
                                                    {elem.dosage}
                                                  </p>
                                                  <p>
                                                    <b>Horario:</b> {elem.time}
                                                  </p>
                                                  <div className="row">
                                                    <div className="description-block mr-3">
                                                      <button
                                                        className="btn"
                                                        data-toggle="modal"
                                                        data-target="#removeMedicineModal"
                                                        onClick={this.removeMedicineOnClick.bind(
                                                          this,
                                                          elem._id
                                                        )}
                                                        style={{
                                                          border:
                                                            "1px solid black"
                                                        }}
                                                      >
                                                        Apagar
                                                      </button>
                                                    </div>
                                                    <div className="description-block mr-3">
                                                      <Link
                                                        className="btn"
                                                        style={{
                                                          border:
                                                            "1px solid black"
                                                        }}
                                                        to={`/paciente/${_id}/ver/medicamento/editar/${
                                                          elem._id
                                                        }`}
                                                      >
                                                        Editar
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ))
                                          ) : (
                                            <p className="mt-4">
                                              Sem medicamentos disponíveis
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}

                              {isParent ? (
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
                                        Registos
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
                                        Registos partilhados
                                      </a>
                                    </li>
                                    {/* <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="myclinical-tab"
                                        data-toggle="tab"
                                        href="#myclinical"
                                        role="tab"
                                        aria-controls="myclinical"
                                        aria-selected="true"
                                      >
                                        Historial
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="clinicalAvailableTo-tab"
                                        data-toggle="tab"
                                        href="#clinicalAvailableTo"
                                        role="tab"
                                        aria-controls="clinicalAvailableTo"
                                        aria-selected="false"
                                      >
                                        Historial Partilhado
                                      </a>
                                    </li> */}

                                    <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="medicamentos-tab"
                                        data-toggle="tab"
                                        href="#medicamentos"
                                        role="tab"
                                        aria-controls="medicamentos"
                                        aria-selected="false"
                                      >
                                        Medicamentos
                                      </a>
                                    </li>
                                  </ul>

                                  <div
                                    className="tab-content"
                                    id="myTabContent"
                                  >
                                    <div
                                      className="tab-pane fade show active"
                                      id="mynotes"
                                      role="tabpanel"
                                      aria-labelledby="mynotes-tab"
                                    >
                                      {therapeuticNote ? (
                                        therapeuticNote.length > 0 ? (
                                          therapeuticNote.map(note =>
                                            note.user._id ==
                                            this.props.auth.user.id ? (
                                              <TherapeuticNote
                                                key={note.id}
                                                TherapeuticNote={note}
                                              />
                                            ) : null
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
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
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div>

                                    {/* <div
                                      className="tab-pane fade"
                                      id="myclinical"
                                      role="tabpanel"
                                      aria-labelledby="myclinical-tab"
                                    >
                                      {clinicalHistory ? (
                                        clinicalHistory.length > 0 ? (
                                          clinicalHistory.map(note =>
                                            note.user._id ==
                                            this.props.auth.user.id ? (
                                              <ClinicalHistory
                                                key={note.id}
                                                ClinicalHistory={note}
                                              />
                                            ) : null
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div> */}

                                    {/* <div
                                      className="tab-pane fade"
                                      id="clinicalAvailableTo"
                                      role="tabpanel"
                                      aria-labelledby="clinicalAvailableTo-tab"
                                    >
                                      {clinicalHistory ? (
                                        shared_clinical == true ? (
                                          clinicalHistory.map(note =>
                                            note.availableTo.map(elem =>
                                              elem == this.props.auth.user.id &&
                                              note.user._id !==
                                                this.props.auth.user.id ? (
                                                <ClinicalHistory
                                                  key={note.id}
                                                  ClinicalHistory={note}
                                                />
                                              ) : null
                                            )
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div> */}

                                    <div
                                      className="tab-pane fade"
                                      id="medicamentos"
                                      role="tabpanel"
                                      aria-labelledby="medicamentos-tab"
                                    >
                                      <div>
                                        <div className="row">
                                          {typeof medicine !== "undefined" &&
                                          medicine.length > 0 ? (
                                            medicine.map(elem => (
                                              <div className="col-md-12">
                                                <div className="card card-body mb-2">
                                                  <h2>{elem.name} </h2>{" "}
                                                  <Link
                                                    to={`/terapeuta/${
                                                      elem.user_id
                                                    }`}
                                                    style={{ color: "black" }}
                                                  >
                                                    <h5>
                                                      Criado por:{" "}
                                                      {elem
                                                        ? elem.user_name
                                                        : null}
                                                    </h5>
                                                  </Link>
                                                  <p>
                                                    {" "}
                                                    {elem.startingDate ? (
                                                      <span className="mr-3">
                                                        <b>Inicio da toma:</b>{" "}
                                                        {elem.startingDate.slice(
                                                          0,
                                                          10
                                                        )}{" "}
                                                      </span>
                                                    ) : null}
                                                    {elem.finishedDate ? (
                                                      <span>
                                                        <b>Fim da toma:</b>{" "}
                                                        {elem.finishedDate.slice(
                                                          0,
                                                          10
                                                        )}{" "}
                                                      </span>
                                                    ) : null}
                                                    {new Date(Date.now()) >
                                                    new Date(
                                                      new Date(
                                                        elem.finishedDate
                                                      )
                                                    ) ? (
                                                      <span>
                                                        (Medicação Suspensa)
                                                      </span>
                                                    ) : null}
                                                  </p>
                                                  <p>
                                                    <b>Observações:</b>{" "}
                                                    {elem.observation}
                                                  </p>
                                                  <p>
                                                    <b>Dosagem:</b>{" "}
                                                    {elem.dosage}
                                                  </p>
                                                  <p>
                                                    <b>Horario:</b> {elem.time}
                                                  </p>
                                                  <div className="row">
                                                    <div className="description-block mr-3">
                                                      <button
                                                        className="btn"
                                                        data-toggle="modal"
                                                        data-target="#removeMedicineModal"
                                                        onClick={this.removeMedicineOnClick.bind(
                                                          this,
                                                          elem._id
                                                        )}
                                                        style={{
                                                          border:
                                                            "1px solid black"
                                                        }}
                                                      >
                                                        Apagar
                                                      </button>
                                                    </div>
                                                    <div className="description-block mr-3">
                                                      <Link
                                                        className="btn"
                                                        style={{
                                                          border:
                                                            "1px solid black"
                                                        }}
                                                        to={`/paciente/${_id}/ver/medicamento/editar/${
                                                          elem._id
                                                        }`}
                                                      >
                                                        Editar
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ))
                                          ) : (
                                            <p className="mt-4">
                                              Sem medicamentos disponíveis
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}

                              {isAdmin ? (
                                <div className="mb-5">
                                  <ul
                                    className="nav nav-tabs"
                                    id="myTab"
                                    role="tablist"
                                  >
                                    {/* <li className="nav-item">
                                      <a
                                        className="nav-link active"
                                        id="mynotes-tab"
                                        data-toggle="tab"
                                        href="#mynotes"
                                        role="tab"
                                        aria-controls="mynotes"
                                        aria-selected="true"
                                      >
                                        Registos
                                      </a>
                                    </li> */}
                                    {/* <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="availableTo-tab"
                                        data-toggle="tab"
                                        href="#availableTo"
                                        role="tab"
                                        aria-controls="availableTo"
                                        aria-selected="false"
                                      >
                                        Registos partilhados
                                      </a>
                                    </li> */}
                                    {/* <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="myclinical-tab"
                                        data-toggle="tab"
                                        href="#myclinical"
                                        role="tab"
                                        aria-controls="myclinical"
                                        aria-selected="true"
                                      >
                                        Historial
                                      </a>
                                    </li> */}
                                    {/* <li className="nav-item">
                                      <a
                                        className="nav-link"
                                        id="clinicalAvailableTo-tab"
                                        data-toggle="tab"
                                        href="#clinicalAvailableTo"
                                        role="tab"
                                        aria-controls="clinicalAvailableTo"
                                        aria-selected="false"
                                      >
                                        Historial Partilhado
                                      </a>
                                    </li> */}

                                    <li className="nav-item">
                                      <a
                                        className="nav-link active"
                                        id="medicamentos-tab"
                                        data-toggle="tab"
                                        href="#medicamentos"
                                        role="tab"
                                        aria-controls="medicamentos"
                                        aria-selected="false"
                                      >
                                        Medicamentos
                                      </a>
                                    </li>
                                  </ul>

                                  <div
                                    className="tab-content"
                                    id="myTabContent"
                                  >
                                    {/* <div
                                      className="tab-pane fade show active"
                                      id="mynotes"
                                      role="tabpanel"
                                      aria-labelledby="mynotes-tab"
                                    >
                                      {therapeuticNote ? (
                                        therapeuticNote.length > 0 ? (
                                          therapeuticNote.map(note =>
                                            note.user._id ==
                                            this.props.auth.user.id ? (
                                              <TherapeuticNote
                                                key={note.id}
                                                TherapeuticNote={note}
                                              />
                                            ) : null
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div> */}
                                    {/* <div
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
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div> */}

                                    {/* <div
                                      className="tab-pane fade"
                                      id="myclinical"
                                      role="tabpanel"
                                      aria-labelledby="myclinical-tab"
                                    >
                                      {clinicalHistory ? (
                                        clinicalHistory.length > 0 ? (
                                          clinicalHistory.map(note =>
                                            note.user._id ==
                                            this.props.auth.user.id ? (
                                              <ClinicalHistory
                                                key={note.id}
                                                ClinicalHistory={note}
                                              />
                                            ) : null
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div>

                                    <div
                                      className="tab-pane fade"
                                      id="clinicalAvailableTo"
                                      role="tabpanel"
                                      aria-labelledby="clinicalAvailableTo-tab"
                                    >
                                      {clinicalHistory ? (
                                        shared_clinical == true ? (
                                          clinicalHistory.map(note =>
                                            note.availableTo.map(elem =>
                                              elem == this.props.auth.user.id &&
                                              note.user._id !==
                                                this.props.auth.user.id ? (
                                                <ClinicalHistory
                                                  key={note.id}
                                                  ClinicalHistory={note}
                                                />
                                              ) : null
                                            )
                                          )
                                        ) : (
                                          <p className="mt-4">
                                            Sem registos disponíveis
                                          </p>
                                        )
                                      ) : null}
                                    </div> */}

                                    <div
                                      className="tab-pane fade show active"
                                      id="medicamentos"
                                      role="tabpanel"
                                      aria-labelledby="medicamentos-tab"
                                    >
                                      <div>
                                        <div className="row">
                                          {typeof medicine !== "undefined" &&
                                          medicine.length > 0 ? (
                                            medicine.map(elem => (
                                              <div className="col-md-12">
                                                <div className="card card-body mb-2">
                                                  <h2>{elem.name} </h2>{" "}
                                                  <Link
                                                    to={`/terapeuta/${
                                                      elem.user_id
                                                    }`}
                                                    style={{ color: "black" }}
                                                  >
                                                    <h5>
                                                      Criado por:{" "}
                                                      {elem
                                                        ? elem.user_name
                                                        : null}
                                                    </h5>
                                                  </Link>
                                                  <p>
                                                    {" "}
                                                    {elem.startingDate ? (
                                                      <span className="mr-3">
                                                        <b>Inicio da toma:</b>{" "}
                                                        {elem.startingDate.slice(
                                                          0,
                                                          10
                                                        )}{" "}
                                                      </span>
                                                    ) : null}
                                                    {elem.finishedDate ? (
                                                      <span>
                                                        <b>Fim da toma:</b>{" "}
                                                        {elem.finishedDate.slice(
                                                          0,
                                                          10
                                                        )}{" "}
                                                      </span>
                                                    ) : null}
                                                    {new Date(Date.now()) >
                                                    new Date(
                                                      new Date(
                                                        elem.finishedDate
                                                      )
                                                    ) ? (
                                                      <span>
                                                        (Medicação Suspensa)
                                                      </span>
                                                    ) : null}
                                                  </p>
                                                  <p>
                                                    <b>Observações:</b>{" "}
                                                    {elem.observation}
                                                  </p>
                                                  <p>
                                                    <b>Dosagem:</b>{" "}
                                                    {elem.dosage}
                                                  </p>
                                                  <p>
                                                    <b>Horario:</b> {elem.time}
                                                  </p>
                                                  <div className="row">
                                                    <div className="description-block mr-3">
                                                      <button
                                                        className="btn"
                                                        data-toggle="modal"
                                                        data-target="#removeMedicineModal"
                                                        onClick={this.removeMedicineOnClick.bind(
                                                          this,
                                                          elem._id
                                                        )}
                                                        style={{
                                                          border:
                                                            "1px solid black"
                                                        }}
                                                      >
                                                        Apagar
                                                      </button>
                                                    </div>
                                                    <div className="description-block mr-3">
                                                      <Link
                                                        className="btn"
                                                        style={{
                                                          border:
                                                            "1px solid black"
                                                        }}
                                                        to={`/paciente/${_id}/ver/medicamento/editar/${
                                                          elem._id
                                                        }`}
                                                      >
                                                        Editar
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ))
                                          ) : (
                                            <p className="mt-4">
                                              Sem medicamentos disponíveis
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                              <div class="card">
                                <div class="card-header">
                                  <h3 class="card-title">Especialistas</h3>
                                </div>

                                {/* /.card-header */}
                                <div className="card-body p-0">
                                  <ul className="products-list product-list-in-card pl-2 pr-2">
                                    {patientTherapists.length > 0 ? (
                                      patientTherapists.map(elem => (
                                        <li className="item">
                                          <div className="product-img">
                                            <img
                                              src={doctor_pic}
                                              alt="Product Image"
                                              className="img-circle"
                                            />
                                          </div>
                                          <div className="product-info">
                                            <Link
                                              className="product-description"
                                              to={`/terapeuta/${elem._id}`}
                                            >
                                              {elem.name}
                                            </Link>
                                            <span class="badge float-right">
                                              {" "}
                                              {isAdmin || isTherapist ? (
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
                                            </span>
                                            <span className="product-description">
                                              <b>Email: </b>
                                              {elem.email}
                                            </span>
                                            <span className="product-description">
                                              <b>Especialidade: </b>
                                              {elem.specialty}
                                            </span>
                                          </div>
                                        </li>
                                      ))
                                    ) : (
                                      <p> Sem especialistas associados </p>
                                    )}
                                  </ul>
                                </div>
                              </div>

                              <div class="card">
                                <div class="card-header">
                                  <h3 class="card-title">Familiares</h3>
                                </div>

                                {/* /.card-header */}
                                <div className="card-body p-0">
                                  <ul className="products-list product-list-in-card pl-2 pr-2">
                                    {patientParents.length > 0 ? (
                                      patientParents.map(elem => (
                                        <li className="item">
                                          <div className="product-img">
                                            <img
                                              src={user}
                                              alt="Product Image"
                                              className="img-circle"
                                            />
                                          </div>
                                          <div className="product-info">
                                            <a className="product-title">
                                              <Link
                                                className="product-description"
                                                to={`/parente/${elem._id}`}
                                              >
                                                {elem.name}
                                              </Link>
                                              <span class="badge float-right">
                                                {" "}
                                                {isAdmin || isTherapist ? (
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
                                              </span>
                                            </a>

                                            <span className="product-description">
                                              <b>Email: </b>
                                              {elem.email}
                                            </span>
                                          </div>
                                        </li>
                                      ))
                                    ) : (
                                      <p> Sem familiares associados </p>
                                    )}
                                  </ul>
                                </div>
                              </div>

                              {history ? (
                                <div class="card">
                                  <div class="card-header">
                                    <h3 class="card-title">
                                      Histórico de Acompanhamento
                                    </h3>
                                  </div>

                                  {/* /.card-header */}

                                  <div className="card-body p-0">
                                    <ul className="products-list product-list-in-card pl-2 pr-2">
                                      {history.length > 0 ? (
                                        history.map(elem => (
                                          <li className="item">
                                            <div className="product-img">
                                              <img
                                                src={user}
                                                alt="Product Image"
                                                className="img-circle"
                                              />
                                            </div>
                                            <div className="product-info mb-4">
                                              <a className="product-title">
                                                <Link
                                                  className="product-description"
                                                  to={`/terapeuta/${
                                                    elem.user_id
                                                  }`}
                                                >
                                                  {elem.user_name}
                                                </Link>
                                              </a>

                                              <span className="product-description">
                                                <b>Email: </b>
                                                {elem.user_email}
                                              </span>

                                              <span className="product-description">
                                                <b>Especialidade: </b>
                                                {elem.user_specialty}
                                              </span>
                                            </div>

                                            {elem.dates
                                              ? elem.dates.map(date => (
                                                  <div>
                                                    <p>
                                                      <b>Inicio:</b>{" "}
                                                      {date.addedDate.slice(
                                                        0,
                                                        10
                                                      )}
                                                    </p>
                                                    <p>
                                                      <b>Fim:</b>{" "}
                                                      {date.removedDate !==
                                                      null ? (
                                                        date.removedDate.slice(
                                                          0,
                                                          10
                                                        )
                                                      ) : (
                                                        <span>
                                                          Ainda em
                                                          acompanhamento
                                                        </span>
                                                      )}
                                                    </p>
                                                  </div>
                                                ))
                                              : null}
                                          </li>
                                        ))
                                      ) : (
                                        <p> Sem histórico a apresentar </p>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              ) : null}
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
      } else {
        return (
          <div>
            <Navbar />
            <div class="content-wrapper">
              <section class="content">
                <div class="container-fluid">
                  <Sidebar />
                  <section className="content">
                    <div className="error-page">
                      <h2 className="headline text-danger">403</h2>
                      <div className="error-content">
                        <h3>
                          <i className="fa fa-warning text-danger" /> Oops! Não
                          tem autorização para visualizar esta pagina.
                        </h3>
                        <p>
                          Precisa de estar associado a este paciente para poder
                          visualizar esta página.
                        </p>
                        <p>
                          {this.props.auth ? (
                            this.props.auth.user.userType == "therapist" ? (
                              <Link to="/terapeuta-dashboard">
                                Entretanto poderá voltar ao seu dashboard.
                              </Link>
                            ) : null
                          ) : null}
                        </p>
                        <p>
                          {this.props.auth ? (
                            this.props.auth.user.userType == "parent" ? (
                              <Link to="/parente-dashboard">
                                Entretanto poderá voltar ao seu dashboard.
                              </Link>
                            ) : null
                          ) : null}
                        </p>
                      </div>
                    </div>
                    {/* /.error-page */}
                  </section>
                </div>
              </section>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <Navbar />
          <div class="content-wrapper">
            <section class="content">
              <div class="container-fluid">
                <Sidebar />

                <div className="row justify-content-md-center">
                  <Spinner />
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }
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
    getPatientMedicine,
    deleteTherapistPatient
  }
)(withRouter(PatientProfile));
