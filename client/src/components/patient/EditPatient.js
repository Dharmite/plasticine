import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { getPatient, updatePatient } from "../../actions/patientActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class EditPatient extends Component {
  state = {
    name: "",
    age: "",
    clinicalStatus: "",
    schoolName: "",
    schoolSchedule: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const {
      name,
      age,
      clinicalStatus,
      schoolName,
      schoolSchedule
    } = nextProps.patient;
    this.setState({
      name,
      age,
      clinicalStatus,
      schoolName,
      schoolSchedule
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPatient(id);
  }

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
    const { id } = this.props.match.params;

    const newPatient = {
      id,
      name,
      age,
      clinicalStatus,
      schoolName,
      schoolSchedule
    };

    //// SUBMIT Therapist ////
    this.props.updatePatient(newPatient);

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
      <div>
        <div className="col-md-8 mt-3 ml-0 pl-0">
          <Link to="/admin-dashboard" className="btn btn-light">
            Voltar
          </Link>
        </div>
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
                value="Editar paciente"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditPatient.propTypes = {
  patient: PropTypes.object.isRequired,
  getPatient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  patient: state.patient.patient
});

export default connect(
  mapStateToProps,
  { getPatient, updatePatient }
)(withRouter(EditPatient));
