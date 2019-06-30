import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import { getTherapist, updateTherapist } from "../../actions/therapistActions";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import SelectListGroup from "../common/SelectListGroup";

class EditTherapist extends Component {
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

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTherapist(id);
  }

  handleSelectionChanged = e => {
    this.setState({
      specialty: e.target.value
    });
  };

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

    // Check For Errors
    if (newTherapist.specialty == "0") {
      console.log("entrei");
      this.setState({ errors: { specialty: "Este campo tem que ser preenchido com um valor válido" } });
      return;
    }
    //// SUBMIT Therapist ////
    this.props.updateTherapist(newTherapist, this.props.history);

    // Clear State
    this.setState({
      name: "",
      email: "",
      specialty: "",
      errors: {}
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, specialty, errors } = this.state;

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
          <div className="card-header">Editar terapeuta</div>
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
                placeholder="Introduza um email"
                value={email}
                onChange={this.onChange}
                error={errors.name}
              />
              {/* <select
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
              </select> */}

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
                value="Guardar terapeuta"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
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
  therapist: state.therapist.therapist,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTherapist, updateTherapist }
)(withRouter(EditTherapist));
