import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { addParent } from "../../actions/parentActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class AddParent extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    // Check For Errors --> Validation

    const newParent = {
      name,
      email,
      password
    };

    this.props.addParent(newParent);

    // Clear State
    this.setState({
      name: "",
      email: "",
      password: "",
      errors: {}
    });

    this.props.history.push("/admin-dashboard");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, password, errors } = this.state;

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

export default connect(
  null,
  { addParent }
)(withRouter(AddParent));
