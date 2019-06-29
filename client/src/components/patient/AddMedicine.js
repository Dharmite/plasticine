import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMedicine } from "../../actions/patientActions";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddMedicine extends Component {
  componentWillUnmount() {
    if ($(".modal-backdrop")[0]) {
      document.getElementsByClassName("modal-backdrop")[0].remove();
      document.body.classList.remove("modal-open");
      document.body.style = "";
    }
  }
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
    const { _id } = this.props.patient;

    return (
      <div>
        <button
          type="button"
          className="btn btn-light mt-3"
          data-toggle="modal"
          data-target="#backModal"
        >
          Voltar
        </button>
        <div
          className="modal fade"
          id="backModal"
          tabindex="-1"
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
                Deseja voltar à pagina anterior? As alterações não serão
                guardadas
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
                <Link to={`/paciente/ver/${_id}`} className="btn btn-light">
                  Voltar
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
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
              <TextAreaFieldGroup
                label="Observações"
                name="observation"
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
      </div>
    );
  }
}

AddMedicine.propTypes = {
  addMedicine: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  patient: state.patient.patient
});

export default connect(
  mapStateToProps,
  { addMedicine }
)(withRouter(AddMedicine));
