import React, { Component } from "react";
import classnames from "classnames";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPatient } from "../../actions/patientActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

let data = new Date();
let max_date = `${data.getFullYear()}-${data.getMonth() < 9 ? "0" + data.getMonth():data.getMonth()}-${data.getDate() < 9 ? "0" + data.getDate():data.getDate()}`;


class AddPatient extends Component {
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
    observation: "",
    schoolSchedule: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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

    const newPatient = {
      name,
      birthday,
      clinicalStatus,
      observation,
      schoolName,
      schoolSchedule
    };

    this.props.addPatient(newPatient, this.props.history);

    // Clear State
    // this.setState({
    //   name: "",
    //   age: "",
    //   clinicalStatus: "",
    //   schoolName: "",
    //   schoolSchedule: "",
    //   errors: {}
    // });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      name,
      birthday,
      clinicalStatus,
      schoolName,
      observation,
      schoolSchedule,
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
              </div>

              <div className="card mb-3 mt-4">
                <div className="card-header">Adicionar utente</div>
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
                    <div className="form-group">
                      <label htmlFor="birthday">Data de nascimento</label>
                      <input
                        type="date"
                        name="birthday"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.birthday
                        })}
                        value={this.state.birthday}
                        onChange={this.onChange}
                        max={max_date}
                      />
                      {errors.birthday && (
                        <div className="invalid-feedback">
                          {errors.birthday}
                        </div>
                      )}
                    </div>

                    <TextAreaFieldGroup
                      label="Estado clínico"
                      name="clinicalStatus"
                      placeholder="Introduza estado clínico"
                      value={clinicalStatus}
                      onChange={this.onChange}
                      // error={errors.clinicalStatus}
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
                      value="Adicionar utente"
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

AddPatient.propTypes = {
  addPatient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPatient }
)(withRouter(AddPatient));
