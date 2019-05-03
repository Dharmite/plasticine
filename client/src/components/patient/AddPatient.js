import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { addPatient } from "../../actions/patientActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class AddPatient extends Component {
  state = {
    name: "",
    age: "",
    clinicalStatus: "",
    schoolName: "",
    schoolSchedule: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      name,
      age,
      clinicalStatus,
      schoolName,
      schoolSchedule
    } = this.state;

    // Check For Errors --> Validation

    const newPatient = {
      name,
      age,
      clinicalStatus,
      schoolName,
      schoolSchedule
    };

    //// SUBMIT Therapist ////
    this.props.addPatient(newPatient);

    // Clear State
    this.setState({
      name: "",
      age: "",
      clinicalStatus: "",
      schoolName: "",
      schoolSchedule: "",
      errors: {}
    });

    this.props.history.push("/admin-dashboard");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      name,
      age,
      clinicalStatus,
      schoolName,
      schoolSchedule,
      errors
    } = this.state;

    return (
      <div className="card mb-3 mt-4">
        <div className="card-header">Adicionar parente</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Nome"
              name="name"
              placeholder="Introduza o nome"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Idade"
              name="age"
              type="number"
              placeholder="Introduza a idade"
              value={age}
              onChange={this.onChange}
              error={errors.age}
            />
            <TextInputGroup
              label="Estado clinico"
              name="clinicalStatus"
              placeholder="Introduza estado clinico"
              value={clinicalStatus}
              onChange={this.onChange}
              error={errors.clinicalStatus}
            />

            <TextInputGroup
              label="Nome da escola"
              name="schoolName"
              placeholder="Nome da escola"
              value={schoolName}
              onChange={this.onChange}
              error={errors.schoolName}
            />

            <TextInputGroup
              label="Horário escolar"
              name="schoolSchedule"
              placeholder="Horário"
              value={schoolSchedule}
              onChange={this.onChange}
              error={errors.schoolSchedule}
            />

            <input
              type="submit"
              value="Adicionar paciente"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddPatient.propTypes = {
  addPatient: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPatient }
)(withRouter(AddPatient));
