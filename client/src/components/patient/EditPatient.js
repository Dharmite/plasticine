import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { getPatient, updatePatient } from "../../actions/patientActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class EditPatient extends Component {
  componentWillUnmount() {
    if ($(".modal-backdrop")[0]) {
      document.getElementsByClassName("modal-backdrop")[0].remove();
      document.body.classList.remove("modal-open");
      document.body.style = "";
    }
  }

  state = {
    name: "",
    birthday: "",
    clinicalStatus: "",
    schoolName: "",
    observation:"",
    schoolSchedule: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const {
      name,
      birthday,
      clinicalStatus,
      schoolName,
      observation,
      schoolSchedule
    } = nextProps.patient;
    this.setState({
      name,
      birthday,
      clinicalStatus,
      schoolName,
      observation,
      schoolSchedule
    });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPatient(id);
  }

  onSubmit = e => {
    e.preventDefault();

    const {
      name,
      birthday,
      clinicalStatus,
      schoolName,
      observation,
      schoolSchedule
    } = this.state;

    // Check For Errors --> Validation
    const { id } = this.props.match.params;

    const newPatient = {
      id,
      name,
      birthday,
      clinicalStatus,
      schoolName,
      observation,
      schoolSchedule
    };

    //// SUBMIT Therapist ////
    this.props.updatePatient(newPatient, this.props.history);

    // Clear State
    this.setState({
      name: "",
      birthday: "",
      clinicalStatus: "",
      schoolName: "",
      schoolSchedule: "",
      observation: "",
      errors: {}
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      name,
      birthday,
      clinicalStatus,
      schoolName,
      schoolSchedule,
      observation,
      errors
    } = this.state;

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
                      <Link to="/admin-dashboard" className="btn btn-light">
                        Voltar
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="card mb-3 mt-4">
                <div className="card-header">Editar utente</div>
                <small className="text-muted ml-3 mt-3">
                  Todos os campos são obrigatórios
                </small>
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
                      label="Data de nascimento"
                      name="birthday"
                      type="date"
                      value={birthday.slice(0, 10)}
                      onChange={this.onChange}
                    />
                    <TextAreaFieldGroup
                      label="Estado clinico"
                      name="clinicalStatus"
                      placeholder="Introduza estado clinico"
                      value={clinicalStatus}
                      onChange={this.onChange}
                      error={errors.clinicalStatus}
                    />
                    <TextAreaFieldGroup
                      label="Observações"
                      name="observation"
                      placeholder="Introduza observações adicionais"
                      value={observation}
                      onChange={this.onChange}
                      error={errors.observation}
                    />

                    <TextInputGroup
                      label="Nome da escola"
                      name="schoolName"
                      placeholder="Nome da escola"
                      value={schoolName}
                      onChange={this.onChange}
                      error={errors.schoolName}
                    />

                    <TextAreaFieldGroup
                      label="Horário escolar"
                      name="schoolSchedule"
                      placeholder="Horário"
                      value={schoolSchedule}
                      onChange={this.onChange}
                      error={errors.schoolSchedule}
                    />

                    <input
                      type="submit"
                      value="Guardar utente"
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

EditPatient.propTypes = {
  patient: PropTypes.object.isRequired,
  getPatient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  patient: state.patient.patient,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPatient, updatePatient }
)(withRouter(EditPatient));
