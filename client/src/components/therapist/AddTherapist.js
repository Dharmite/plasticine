import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { addTherapist } from "../../actions/therapistActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class AddTherapist extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    specialty: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, specialty } = this.state;

    const newTherapist = {
      name,
      email,
      password,
      specialty
    };

    //// SUBMIT Therapist ////
    this.props.addTherapist(newTherapist);

    // Clear State
    this.setState({
      name: "",
      email: "",
      password: "",
      specialty: "",
      errors: {}
    });

    this.props.history.push("/admin-dashboard");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, password, specialty, errors } = this.state;

    return (
      <div className="card mb-3 mt-4">
        <div className="card-header">Adicionar terapeuta</div>
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
            <TextInputGroup
              label="Especialidade clínica"
              name="specialty"
              placeholder="Introduza a especialidade"
              value={specialty}
              onChange={this.onChange}
              error={errors.specialty}
            />
            <input
              type="submit"
              value="Adicionar terapeuta"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddTherapist.propTypes = {
  addTherapist: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTherapist }
)(withRouter(AddTherapist));
