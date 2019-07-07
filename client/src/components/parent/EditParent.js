import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import { getParent, updateParent } from "../../actions/parentActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class EditParent extends Component {
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
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email } = nextProps.parent;
    this.setState({
      name,
      email
    });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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

    this.props.updateParent(newParent, this.props.history);

    // Clear State
    this.setState({
      name: "",
      email: "",
      password: "",
      errors: {}
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, errors } = this.state;

    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />
              <button
                type="button"
                className="btn btn-light mt-3"
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
              </div>{" "}
              <div className="card mb-3 mt-4">
                <div className="card-header">Editar parente</div>
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
                      value="Guardar parente"
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

EditParent.propTypes = {
  parent: PropTypes.object.isRequired,
  getParent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  parent: state.parent.parent,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getParent, updateParent }
)(withRouter(EditParent));
