import React, { Component } from "react";
import classnames from "classnames";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import { addParent } from "../../actions/parentActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

let data = new Date();
let max_date = `${data.getFullYear()}-${data.getMonth() < 9 ? "0" + (data.getMonth() + 1):(data.getMonth() + 1)}-${data.getDate() < 9 ? "0" + data.getDate():data.getDate()}`;


class AddParent extends Component {
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
    birthday: "",
    relationship: "",
    password: "",
    password2: "",
    work_status: "",
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
      email,
      password,
      password2,
      birthday,
      relationship,
      work_status
    } = this.state;

    // Check For Errors --> Validation

    const newParent = {
      name,
      email,
      password,
      password2,
      birthday,
      relationship,
      work_status
    };

    const logged_userType = this.props.auth.user.userType;

    this.props.addParent(newParent, this.props.history, logged_userType);

    // Clear State
    // this.setState({
    //   name: "",
    //   email: "",
    //   password: "",
    //   errors: {}
    // });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSelectionChanged = e => {
    let work = [];
    let inputElements = document.getElementsByClassName("form-check-input");
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        work.push(inputElements[i].value);
      }
    }
    this.setState({
      work_status: work
    });
  };

  render() {
    const {
      name,
      email,
      password,
      password2,
      birthday,
      relationship,
      work_status,
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
                tabIndex="-1"
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
                <div className="card-header">Adicionar Familiar</div>
                <small className="text-muted ml-3 mt-3">
                  Todos os campos são obrigatórios
                </small>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <TextInputGroup
                      label="Nome"
                      name="name"
                      placeholder="Introduza um nome"
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Introduza um Email"
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextInputGroup
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Introduza uma password"
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

                    {/* <TextInputGroup
                      label="Data de nascimento"
                      name="birthday"
                      type="date"
                      value={birthday}
                      onChange={this.onChange}
                      error={errors.birthday}
                    /> */}

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

                    <TextInputGroup
                      label="Grau de parentesco"
                      name="relationship"
                      placeholder="Introduza o grau de parentesco"
                      value={relationship}
                      onChange={this.onChange}
                      error={errors.relationship}
                    />
                    <div class="form-check mb-1">
                      <div>
                        <input
                          class="form-check-input"
                          type="radio"
                          name="work_status"
                          id="defaultCheck1"
                          value="empregado"
                          onChange={this.handleSelectionChanged}
                          error={errors.work_status}
                        />
                        Empregado/a
                      </div>
                      <div>
                        <input
                          class="form-check-input"
                          type="radio"
                          name="work_status"
                          id="defaultCheck1"
                          value="desempregado"
                          onChange={this.handleSelectionChanged}
                          error={errors.work_status}
                        />
                        Desempregado/a
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Adicionar Familiar"
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

AddParent.propTypes = {
  addParent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addParent }
)(withRouter(AddParent));
