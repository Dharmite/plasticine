import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addMedicine } from "../../actions/patientActions";

class AddMedicine extends Component {
  state = {
    name: "",
    observation: "",
    dosage: "",
    time: "",
    startingDate: "",
    finishedDate: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props.match.params;

    const {
      name,
      observation,
      dosage,
      time,
      startingDate,
      finishedDate
    } = this.state;

    const newMedicine = {
      name,
      observation,
      dosage,
      time,
      startingDate,
      finishedDate
    };

    //// SUBMIT Therapist ////
    this.props.addMedicine(newMedicine, id, this.props.history);

    // Clear State
    this.setState({
      name: "",
      observation: "",
      dosage: "",
      time: "",
      startingDate: "",
      finishedDate: "",
      errors: {}
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      name,
      observation,
      dosage,
      time,
      startingDate,
      finishedDate
    } = this.state;

    const { errors } = this.props;

    return (
      <div className="card mb-3 mt-4">
        <div className="card-header">Adicionar medicamento</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Nome do medicamento"
              name="name"
              placeholder="Introduza o nome do medicamento"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Observações"
              name="observation"
              type="text"
              placeholder="Observações"
              value={observation}
              onChange={this.onChange}
              error={errors.observation}
            />
            <TextInputGroup
              label="Dosagem"
              name="dosage"
              type="text"
              placeholder="Dosagem do medicamento"
              value={dosage}
              onChange={this.onChange}
              error={errors.dosage}
            />

            <TextInputGroup
              label="Quando é que deve ser tomado o medicamento"
              name="time"
              type="text"
              placeholder="Horário da toma do medicamento"
              value={time}
              onChange={this.onChange}
              error={errors.time}
            />

            <TextInputGroup
              label="Data de ínicio da toma do medicamento"
              name="startingDate"
              type="date"
              onChange={this.onChange}
              value={startingDate}
            />

            <TextInputGroup
              label="Date de fim da toma do medicamento"
              name="finishedDate"
              type="date"
              onChange={this.onChange}
              value={finishedDate}
            />

            <input
              type="submit"
              value="Adicionar medicamento"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddMedicine.propTypes = {
  addMedicine: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMedicine }
)(withRouter(AddMedicine));
