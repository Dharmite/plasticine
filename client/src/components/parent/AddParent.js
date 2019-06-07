import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import { addParent } from "../../actions/parentActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";

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
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    // Check For Errors --> Validation

    const newParent = {
      name,
      email,
      password
    };

    this.props.addParent(newParent, this.props.history);

    // Clear State
    // this.setState({
    //   name: "",
    //   email: "",
    //   password: "",
    //   errors: {}
    // });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, password, errors } = this.state;

    return (
      <div>
        <button
          type="button"
          class="btn btn-light mt-3"
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
          <div className="card-header">Adicionar parente</div>
          <small class="text-muted ml-3 mt-3">Todos os campos são obrigatórios</small>
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
                label="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={this.onChange}
                error={errors.password}
              />

              <input
                type="submit"
                value="Adicionar parente"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
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
