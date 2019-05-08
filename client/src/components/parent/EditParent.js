import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { getParent, updateParent } from "../../actions/parentActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class EditParent extends Component {
  state = {
    name: "",
    email: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email } = nextProps.parent;
    this.setState({
      name,
      email
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getParent(id);
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email } = this.state;

    // Check For Errors --> Validation
    const { id } = this.props.match.params;


    const newParent = {
      id,
      name,
      email
    };

    this.props.updateParent(newParent);

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
    const { name, email, errors } = this.state;

    return (
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

            <input
              type="submit"
              value="Editar parente"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditParent.propTypes = {
  parent: PropTypes.object.isRequired,
  getParent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  parent: state.parent.parent
});

export default connect(
  mapStateToProps,
  { getParent, updateParent }
)(withRouter(EditParent));
