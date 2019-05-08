import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { getTherapist, updateTherapist } from "../../actions/therapistActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class EditTherapist extends Component {
  state = {
    name: "",
    email: "",
    specialty: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, specialty } = nextProps.therapist;
    this.setState({
      name,
      email,
      specialty
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTherapist(id);
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, specialty } = this.state;
    const { id } = this.props.match.params;

    const newTherapist = {
      id,
      name,
      email,
      specialty
    };

    //// SUBMIT Therapist ////
    this.props.updateTherapist(newTherapist);

    // Clear State
    this.setState({
      name: "",
      email: "",
      specialty: "",
      errors: {}
    });

    this.props.history.push("/admin-dashboard");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, specialty, errors } = this.state;

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
              label="Especialidade clínica"
              name="specialty"
              placeholder="Introduza a especialidade"
              value={specialty}
              onChange={this.onChange}
              error={errors.specialty}
            />
            <input
              type="submit"
              value="Editar terapeuta"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditTherapist.propTypes = {
  therapist: PropTypes.object.isRequired,
  getTherapist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  therapist: state.therapist.therapist
});

export default connect(
  mapStateToProps,
  { getTherapist, updateTherapist }
)(withRouter(EditTherapist));
