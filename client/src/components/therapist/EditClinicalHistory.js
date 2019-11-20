import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  getPatient,
  updateClinicalHistory,
  getClinicalHistory
} from "../../actions/patientActions";
import $ from "jquery";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

let data = new Date();
let max_date = `${data.getFullYear()}-${
  data.getMonth() < 9 ? "0" + data.getMonth() : data.getMonth()
}-${data.getDate() < 9 ? "0" + data.getDate() : data.getDate()}`;

class EditClinicalHistory extends Component {
  componentWillUnmount() {
    if ($(".modal-backdrop")[0]) {
      document.getElementsByClassName("modal-backdrop")[0].remove();
      document.body.classList.remove("modal-open");
      document.body.style = "";
    }
  }
  state = {
    title: "",
    observation: "",
    activity: "",
    behavior: "",
    valuationDate: "",
    duration: "",
    valuation: "",
    evolution: "",
    availableTo2: "",
    files: "",
    filename: "Escolha um ficheiro",
    errors: {}
  };

  componentDidMount() {
    const { patient_id } = this.props.match.params;
    this.props.getPatient(patient_id);

    const { note_id } = this.props.match.params;
    this.props.getClinicalHistory(note_id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {
      title,
      activity,
      behavior,
      observation,
      valuationDate,
      duration,
      valuation,
      evolution,
      files,
      filename
    } = nextProps.note;

    this.setState({
      title,
      activity,
      behavior,
      observation,
      valuationDate,
      duration,
      valuation,
      evolution,
      files,
      availableTo2: "",
      filename
    });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const {
      title,
      observation,
      activity,
      behavior,
      availableTo2,
      valuationDate,
      duration,
      valuation,
      evolution
    } = this.state;

    let availableTo = "";

    if (availableTo2 !== "") {
      availableTo2.forEach(element => {
        availableTo += element + ",";
      });

      availableTo = availableTo.replace(/,/g, " ");

      availableTo = availableTo.replace(/\s+$/, "");

      let formData = new FormData();
      formData.append("title", title);
      formData.append("observation", observation);
      formData.append("activity", activity);
      formData.append("behavior", behavior);
      formData.append("valuationDate", valuationDate);
      formData.append("duration", duration);
      formData.append("valuation", valuation);
      formData.append("evolution", evolution);
      formData.append("availableTo", availableTo);
      for (var x = 0; x < this.state.files.length; x++) {
        formData.append("files", this.state.files[x]);
      }

      const { note_id } = this.props.match.params;
      const { patient_id } = this.props.match.params;
      this.props.updateClinicalHistory(
        patient_id,
        note_id,
        formData,
        this.props.history
      );

      this.setState({
        title: "",
        observation: "",
        activity: "",
        behavior: "",
        valuationDate: "",
        duration: "",
        valuation: "",
        evolution: "",
        files: "",
        availableTo2: "",
        errors: {}
      });
    } else {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("observation", observation);
      formData.append("activity", activity);
      formData.append("behavior", behavior);
      formData.append("valuationDate", valuationDate);
      formData.append("duration", duration);
      formData.append("valuation", valuation);
      formData.append("evolution", evolution);
      formData.append("availableTo", availableTo2);
      for (var x = 0; x < this.state.files.length; x++) {
        formData.append("files", this.state.files[x]);
      }

      const { note_id } = this.props.match.params;
      const { patient_id } = this.props.match.params;
      this.props.updateClinicalHistory(
        patient_id,
        note_id,
        formData,
        this.props.history
      );

      this.setState({
        title: "",
        observation: "",
        activity: "",
        behavior: "",
        valuationDate: "",
        duration: "",
        valuation: "",
        evolution: "",
        files: "",
        availableTo2: "",
        errors: {}
      });
    }
  };
  onChange = e => {
    if (e.target.name === "files") {
      this.setState({ files: e.target.files });
      this.setState({ filename: e.target.files[0].name });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSelectionChanged = e => {
    let availableTo2 = [];
    let inputElements = document.getElementsByClassName("form-check-input");
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        availableTo2.push(inputElements[i].value);
      }
    }
    this.setState({
      availableTo2: availableTo2
    });
  };

  render() {
    const {
      title,
      observation,
      activity,
      behavior,
      valuationDate,
      duration,
      valuation,
      evolution,
      errors,
      filename
    } = this.state;

    let { therapist, parent } = this.props.patient;

    if (this.props.note.valuationDate) {
      console.log(this.props.note.valuationDate.slice(0, 10), "note");
    }

    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />
              <button
                type="button"
                className="btn mt-3"
                style={{
                  border: "1px solid black",
                  backgroundColor: "white"
                }}
                data-toggle="modal"
                data-target="#backModal"
              >
                Voltar
              </button>
              <div
                class="modal fade"
                id="backModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Atenção!
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      Deseja voltar à pagina anterior? As alterações não serão
                      guardadas
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      <Link
                        to={`/paciente/ver/${
                          this.props.match.params.patient_id
                        }`}
                        className="btn btn-light"
                      >
                        Voltar
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3 mt-4">
                <div className="card-header">Editar Historial Clínico</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <TextInputGroup
                      label="Titulo"
                      name="title"
                      placeholder="Introduza um titulo"
                      value={title}
                      onChange={this.onChange}
                      error={errors.title}
                    />
                    <TextAreaFieldGroup
                      label="Observação"
                      name="observation"
                      placeholder="Introduza uma observação"
                      value={observation}
                      onChange={this.onChange}
                      error={errors.observation}
                    />
                    <TextAreaFieldGroup
                      label="Atividade realizada"
                      name="activity"
                      placeholder="Introduza o nome da atividade"
                      value={activity}
                      onChange={this.onChange}
                      error={errors.activity}
                    />

                    <TextAreaFieldGroup
                      label="Comportamento demonstrado"
                      name="behavior"
                      placeholder="Descreva o comportamento demostrado"
                      value={behavior}
                      onChange={this.onChange}
                      error={errors.behavior}
                    />

                    <TextAreaFieldGroup
                      label="Avaliação"
                      name="valuation"
                      placeholder="Faça uma avaliação"
                      value={valuation}
                      onChange={this.onChange}
                      error={errors.valuation}
                    />

                    <div className="form-group">
                      <label htmlFor="birthday">Data da avaliação</label>
                      <input
                        type="date"
                        name="valuationDate"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.valuationDate
                        })}
                        value={
                          this.state.valuationDate
                            ? this.state.valuationDate.slice(0, 10)
                            : null
                        }
                        onChange={this.onChange}
                        max={max_date}
                      />
                      {errors.valuationDate && (
                        <div className="invalid-feedback">
                          {errors.valuationDate}
                        </div>
                      )}
                    </div>

                    <TextInputGroup
                      label="Duração da avaliação realizada"
                      name="duration"
                      placeholder="Indique a duração da avaliação"
                      value={duration}
                      onChange={this.onChange}
                      error={errors.duration}
                    />
                    <TextAreaFieldGroup
                      label="Síntese da evolução"
                      name="evolution"
                      placeholder="Descreva a evolução apresentada pelo utente"
                      value={evolution}
                      onChange={this.onChange}
                      error={errors.evolution}
                    />

                    <div className="form-group">
                      {therapist || parent ? (
                        therapist.length > 1 || parent.length > 0 ? (
                          <label>Disponível para:</label>
                        ) : null
                      ) : null}
                      {therapist
                        ? therapist.map(elem =>
                            elem._id !== this.props.auth.user.id &&
                            elem.account_status == "active" ? (
                              <div class="form-check mb-1">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="availableTo2"
                                  id="defaultCheck1"
                                  value={elem._id}
                                  onChange={this.handleSelectionChanged}
                                  error={errors.availableTo2}
                                />

                                <label
                                  class="form-check-label"
                                  for="defaultCheck1"
                                >
                                  {elem.name}
                                </label>
                              </div>
                            ) : null
                          )
                        : null}

                      {parent
                        ? parent.map(elem =>
                            elem._id !== this.props.auth.user.id ? (
                              <div class="form-check mb-1">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="availableTo2"
                                  id="defaultCheck1"
                                  value={elem._id}
                                  onChange={this.handleSelectionChanged}
                                  error={errors.availableTo2}
                                />
                                <label
                                  class="form-check-label"
                                  for="defaultCheck1"
                                >
                                  {elem.name}
                                </label>
                              </div>
                            ) : null
                          )
                        : null}
                    </div>

                    <div className="custom-file mb-4">
                      <input
                        type="file"
                        name="files"
                        className="custom-file-input"
                        id="customFile"
                        placeholder="Faça upload dos ficheiros"
                        onChange={this.onChange}
                        error={errors.files}
                        multiple
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {" "}
                        {filename}
                      </label>
                    </div>

                    <input
                      type="submit"
                      value="Guardar Historial Clínico"
                      className="btn btn-info btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

EditClinicalHistory.propTypes = {
  updateClinicalHistory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  patient: state.patient.patient,
  note: state.patient.clinicalNote
});

export default connect(
  mapStateToProps,
  { getPatient, updateClinicalHistory, getClinicalHistory }
)(withRouter(EditClinicalHistory));
