import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getPatient } from "../../actions/patientActions";
import $ from "jquery";

class AddTherapeuticNote extends Component {
  state = {
    title: "",
    observation: "",
    activity: "",
    behavior: "",
    availableTo: "",
    files: "",
    errors: {}
  };

  handleSelectionChanged = e => {
    this.setState({
      availableTo: e.target.value
    });
  };

  componentDidMount() {

    const { id } = this.props.match.params;
    this.props.getPatient(id);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      title,
      observation,
      activity,
      behavior,
      errors,
      availableTo,
      files
    } = this.state;

    const { therapist } = this.props.patient;
    console.log(therapist, "therapist");

    return (
      <div className="card mb-3 mt-4">
        <div className="card-header">Adicionar registo terapêutico</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Titulo"
              name="title"
              placeholder="Introduza um titulo"
              value={title}
              onChange={this.onChange}
              error={errors.title}
            />
            <TextInputGroup
              label="Observação"
              name="observation"
              type="text"
              placeholder="Introduza uma observação"
              value={observation}
              onChange={this.onChange}
              error={errors.observation}
            />
            <TextInputGroup
              label="Atividade realizada"
              name="activity"
              type="text"
              placeholder="Introduza o nome da atividade"
              value={activity}
              onChange={this.onChange}
              error={errors.activity}
            />

            <TextInputGroup
              label="Comportamento demonstrado"
              name="behavior"
              type="text"
              placeholder="Descreva o comportamento demostrado"
              value={behavior}
              onChange={this.onChange}
              error={errors.behavior}
            />

            <label>Disponível para:</label>

            {/* <select
              className="form-control form-control-lg"
              id="exampleFormControlSelect1"
              error={errors.availableTo}
              value={availableTo}
              name="availableTo"
              onChange={this.handleSelectionChanged}
              multiple="multiple"
            >
              <option>Escolha com quem quer partilhar</option>

              {therapist
                ? therapist.map(elem => <option>{elem.name}</option>)
                : null}
            </select> */}
            <select
              class="mdb-select colorful-select dropdown-primary md-form"
              multiple
            >
              <option value="" disabled selected>
                Choose your country
              </option>
              <option value="1">USA</option>
              <option value="2">Germany</option>
              <option value="3">France</option>
              <option value="4">Poland</option>
              <option value="5">Japan</option>
            </select>
            <label class="mdb-main-label">Label example</label>
            <button class="btn-save btn btn-primary btn-sm">Save</button>

            <TextInputGroup
              label="Ficheiros"
              name="files"
              type="file"
              placeholder="Faça upload dos ficheiros"
              value={files}
              onChange={this.onChange}
              error={errors.files}
            />

            <input
              type="submit"
              value="Adicionar terapeuta"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

// AddTherapeuticNote.propTypes = {
//     addTherapist: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  patient: state.patient.patient,
  patientTherapists: state.patient.patientTherapists,
  patientParents: state.patient.patientParents,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPatient }
)(withRouter(AddTherapeuticNote));
