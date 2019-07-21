import React, { Component } from "react";
import classnames from "classnames";
import TextInputGroup from "../common/TextInputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import { addTherapist } from "../../actions/therapistActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class AddTherapist extends Component {
  componentWillUnmount() {
    if ($(".modal-backdrop")[0]) {
      document.getElementsByClassName("modal-backdrop")[0].remove();
      document.body.classList.remove("modal-open");
      document.body.style = "";
    }
  }

  state = {
    name: "",
    email: "",
    password: "",
    specialty: "",
    password2: "",
    other: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, specialty, password2, other } = this.state;

    const newTherapist = {
      name,
      email,
      password,
      password2,
      specialty,
      other
    };

    this.props.addTherapist(newTherapist, this.props.history);

    // // Clear State
    // this.setState({
    //   name: "",
    //   email: "",
    //   password: "",
    //   specialty: "",
    //   errors: {}
    // });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSelectionChanged = e => {
    this.setState({
      specialty: e.target.value
    });
  };

  render() {
    const {
      name,
      email,
      password,
      password2,
      specialty,
      other,
      errors
    } = this.state;

    // Select options for status
    const options = [
      { label: "* Escolha uma especialidade", value: 0 },
      { label: "Pediatra", value: "Pediatra" },
      { label: "Fisioterapia", value: "Fisioterapia" },
      { label: "Psicologia", value: "Psicologia" },
      { label: "Psicomotricidade", value: "Psicomotricidade" },
      { label: "Terapia da Fala", value: "Terapia da Fala" },
      { label: "Terapia Ocupacional", value: "Terapia Ocupacional" },
      { label: "Outra", value: "Outra" }
    ];

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
                tabindex="-1"
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
                      <Link to="/admin-dashboard" className="btn btn-light">
                        Voltar
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3 mt-4">
                <div className="card-header">Adicionar especialista</div>
                <small class="text-muted ml-3 mt-3">
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
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Introduza o Email"
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextInputGroup
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={this.onChange}
                      error={errors.password}
                    />

                    <div className="form-group">
                      <label htmlFor="password2">Confirmar password</label>
                      <input
                        type="password"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Confirme a sua password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                      />
                      {errors.password2 ? (
                        <div className="invalid-feedback">
                          {errors.password2}
                        </div>
                      ) : null}
                    </div>

                    <SelectListGroup
                      name="specialty"
                      value={specialty}
                      error={errors.specialty}
                      label="Especialidade médica"
                      onChange={this.handleSelectionChanged}
                      options={options}
                    />

                    {this.state.specialty == "Outra" ? (
                      // <TextInputGroup
                      //   label="Especialidade"
                      //   name="other"
                      //   type="text"
                      //   placeholder="Insira a especialidade médica"
                      //   value={other}
                      //   onChange={this.onChange}
                      //   error={errors.other}
                      // />
                      <div className="form-group">
                        <label htmlFor="other">Especialidade</label>
                        <input
                          type="text"
                          name="other"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": (errors.other && this.state.specialty =="Outra")
                            }
                          )}
                          placeholder="Insira a especialidade médica"
                          value={this.state.other}
                          onChange={this.onChange}
                        />
                        {this.state.specialty == "Outra" && errors.other && (
                          <div className="invalid-feedback">{errors.other}</div>
                        )}
                      </div>
                    ) : null}

                    <input
                      type="submit"
                      value="Adicionar especialista"
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

AddTherapist.propTypes = {
  addTherapist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTherapist }
)(withRouter(AddTherapist));
