import React, { Component } from "react";
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
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, specialty } = this.state;

    const newTherapist = {
      name,
      email,
      password,
      specialty
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
    const { name, email, password, specialty, errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Escolha uma especialidade", value: 0 },
      { label: "Psicologia", value: "Psicologia" },
      { label: "Terapia da Fala", value: "Terapia da Fala" },
      { label: "Psicomotricidade", value: "Psicomotricidade" },
      { label: "Fisioterapia", value: "Fisioterapia" },
      { label: "Terapia Ocupacional", value: "Terapia Ocupacional" }
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
                <div className="card-header">Adicionar terapeuta</div>
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

                    <SelectListGroup
                      name="specialty"
                      value={specialty}
                      error={errors.specialty}
                      label="Especialidade clínica"
                      onChange={this.handleSelectionChanged}
                      options={options}
                    />

                    <input
                      type="submit"
                      value="Adicionar terapeuta"
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
