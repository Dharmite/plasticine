import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

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
import user_img from "../../img/user1.jpg";

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
    selectedMedicine_id: ""
  };

  onRemoveUserClick = id => {
    console.log("entrei!!");

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
    const { id } = this.props.match.params;
    this.props.removeTherapistPatient(id, therapist_id);
  };

  removeParent = parent_id => {
    const { id } = this.props.match.params;

    this.props.removeParentPatient(id, parent_id);
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
                                  className="img-circle elevation-2"
                                  src={user_img}
                                  alt="User Avatar"
                                />{" "}
                              </div>
                              <div className="col-lg-4 col-md-4">
                                {name ? <h3>{name}</h3> : null}
                                {age ? <p>Idade: {age}</p> : null}
                                {schoolName ? (
                                  <p>Escola: {schoolName}</p>
                                ) : null}
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
                                Associar Terapeuta
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
                                Associar Parente
                              </a>

                              <Link
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
                              </Link>
                            </div>
                          ) : null}

                          {isTherapist || isParent ? (
                            <div
                              className="btn-group mb-4"
                              role="group"
                              id="associateUser"
                            >
                              {" "}
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
                                Criar nota
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
                                Adicionar medicamento
                              </Link>
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
                                  onChange={
                                    this.handleTherapistSelectionChanged
                                  }
                                >
                                  <option id="option">
                                    Escolha um terapeuta
                                  </option>
                                  {therapists
                                    ? therapists.map(elem => (
                                        <option id="option">{elem.name}</option>
                                      ))
                                    : null}
                                </select>
                              </div>

                              {this.state.selectedTherapist !==
                                "Escolha um terapeuta" &&
                              this.state.selectedTherapist !== "" ? (
                                <button
                                  type="submit"
                                  className="btn btn-primary mb-2"
                                  style={{ marginRight: "5px;" }}
                                >
                                  {" "}
                                  Associar terapeuta
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
                                  Selecione o parente
                                </label>
                                <select
                                  className="form-control ml-3"
                                  id="exampleFormControlSelect1"
                                  onChange={this.handleParentSelectionChanged}
                                >
                                  <option id="option">
                                    Escolha um parente
                                  </option>
                                  {parents
                                    ? parents.map(elem => (
                                        <option id="option">{elem.name}</option>
                                      ))
                                    : null}
                                </select>
                              </div>

                              {this.state.selectedParent !==
                                "Escolha um parente" &&
                              this.state.selectedParent !== "" ? (
                                <button
                                  type="submit"
                                  className="btn btn-primary mb-2"
                                  style={{ marginRight: "5px;" }}
                                >
                                  {" "}
                                  Associar parente
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
                              {isTherapist || isParent || isAdmin ? (
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
                                            Sem notas disponíveis
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
                                            Sem notas disponíveis
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
                                                  <h4>{elem.name} </h4>
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
                                                  {elem.startingDate ? (
                                                    <p>
                                                      <b>Inicio:</b>{" "}
                                                      {elem.startingDate.slice(
                                                        0,
                                                        10
                                                      )}
                                                    </p>
                                                  ) : null}
                                                  {elem.finishedDate ? (
                                                    <p>
                                                      <b>Fim:</b>{" "}
                                                      {elem.finishedDate.slice(
                                                        0,
                                                        10
                                                      )}
                                                    </p>
                                                  ) : null}

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
                                  <h3 class="card-title">Terapeutas</h3>
                                </div>

                                {/* /.card-header */}
                                <div className="card-body p-0">
                                  <ul className="products-list product-list-in-card pl-2 pr-2">
                                    {patientTherapists.length > 0 ? (
                                      patientTherapists.map(elem => (
                                        <li className="item">
                                          <div className="product-img">
                                            <img
                                              src={user_img}
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
                                      <p> Sem parentes associados </p>
                                    )}
                                  </ul>
                                </div>
                              </div>

                              <div class="card">
                                <div class="card-header">
                                  <h3 class="card-title">Parentes</h3>
                                </div>

                                {/* /.card-header */}
                                <div className="card-body p-0">
                                  <ul className="products-list product-list-in-card pl-2 pr-2">
                                    {patientParents.length > 0 ? (
                                      patientParents.map(elem => (
                                        <li className="item">
                                          <div className="product-img">
                                            <img
                                              src={user_img}
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
                                      <p> Sem parentes associados </p>
                                    )}
                                  </ul>
                                </div>
                              </div>
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
    getPatientMedicine
  }
)(withRouter(PatientProfile));
