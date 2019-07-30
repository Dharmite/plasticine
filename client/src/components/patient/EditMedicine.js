import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { updateMedicine, getMedicine } from "../../actions/patientActions";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class EditMedicine extends Component {
  state = {
    name: "",
    observation: "",
    dosage: "",
    time: "",
    startingDate: "",
    finishedDate: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const {
      name,
      observation,
      dosage,
      time,
      startingDate,
      finishedDate
    } = nextProps.medicine;
    this.setState({
      name,
      observation,
      dosage,
      time,
      startingDate,
      finishedDate
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { medicamento_id } = this.props.match.params;
    this.props.getMedicine(id, medicamento_id);
  }

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props.match.params;
    const { medicamento_id } = this.props.match.params;

    const {
      name,
      observation,
      dosage,
      time,
      startingDate,
      finishedDate
    } = this.state;

    const newMedicine = {
      id,
      name,
      observation,
      dosage,
      time,
      startingDate,
      finishedDate
    };

    //// SUBMIT Therapist ////
    this.props.updateMedicine(id, medicamento_id, newMedicine);

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

    this.props.history.push(`/paciente/ver/${id}`);
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
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />

              <div className="card mb-3 mt-4">
                <div className="card-header">Editar Medicamento</div>
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
                      value={startingDate.slice(0, 10)}
                      onChange={this.onChange}
                    />

                    <TextInputGroup
                      label="Date de fim da toma do medicamento"
                      name="finishedDate"
                      type="date"
                      value={finishedDate.slice(0, 10)}
                      onChange={this.onChange}
                    />

                    <input
                      type="submit"
                      value="Guardar Medicamento"
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

EditMedicine.propTypes = {
  editMedicine: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  medicine: state.patient.medicine
});

export default connect(
  mapStateToProps,
  { updateMedicine, getMedicine }
)(withRouter(EditMedicine));
