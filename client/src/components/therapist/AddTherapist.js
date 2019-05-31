import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { addTherapist } from "../../actions/therapistActions";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';
// import axios from 'axios';

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

  handleSelectionChanged = e => {
    this.setState({
      specialty: e.target.value
    });
  };

  render() {
    const { name, email, password, specialty, errors } = this.state;

    return (
      <div>
        <div className="col-md-8 mt-3 ml-0 pl-0">
          <Link to="/admin-dashboard" className="btn btn-light">
            Voltar
          </Link>
        </div>
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

              <label>Especialidade clínica</label>

              <select
                className="form-control form-control-lg"
                id="exampleFormControlSelect1"
                error={errors.specialty}
                value={specialty}
                name="specialty"
                onChange={this.handleSelectionChanged}
              >
                <option>Escolha uma especialidade</option>
                <option>Psicologia</option>
                <option>Terapia da Fala</option>
                <option>Psicomotricidade</option>
                <option>Fisioterapia</option>
                <option>Terapia Ocupacional</option>
              </select>

              <input
                type="submit"
                value="Adicionar terapeuta"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
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
