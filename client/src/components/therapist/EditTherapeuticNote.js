import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  getPatient,
  updateTherapeuticNote,
  getTherapeuticNote
} from "../../actions/patientActions";
import $ from "jquery";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class EditTherapeuticNote extends Component {
  componentWillUnmount() {
    if ($(".modal-backdrop")[0]) {
      document.getElementsByClassName("modal-backdrop")[0].remove();
      document.body.classList.remove("modal-open");
      document.body.style = "";
    }
  }
  state = {
    title: "",
    observation: "",
    activity: "",
    behavior: "",
    files: "",
    filename: "Escolha um ficheiro",
    errors: {}
  };

  componentDidMount() {
    const { patient_id } = this.props.match.params;
    this.props.getPatient(patient_id);
    

    const { note_id } = this.props.match.params;
    this.props.getTherapeuticNote(note_id);


  }

  componentWillReceiveProps(nextProps, nextState) {

    const {
        title,
        activity,
        behavior,
        observation,
        files,
        filename
      } = nextProps.note;
  
  
      this.setState({
        title,
        activity,
        behavior,
        observation,
        files,
        filename
      });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, observation, activity, behavior } = this.state;

    let formData = new FormData();
    formData.append("title", title);
    formData.append("observation", observation);
    formData.append("activity", activity);
    formData.append("behavior", behavior);
    for (var x = 0; x < this.state.files.length; x++) {
      formData.append("files", this.state.files[x]);
    }

    const { note_id } = this.props.match.params;
    this.props.updateTherapeuticNote(note_id, formData, this.props.history);

    this.setState({
      title: "",
      observation: "",
      activity: "",
      behavior: "",
      files: "",
      errors: {}
    });

    
  };

  onChange = e => {
    if (e.target.name == "files") {
      this.setState({ files: e.target.files });
      this.setState({ filename: e.target.files[0].name });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    const {
      title,
      observation,
      activity,
      behavior,
      errors,
      filename
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
                class="btn btn-light mt-3"
                data-toggle="modal"
                data-target="#backModal"
              >
                Voltar
              </button>
              <div
                class="modal fade"
                id="backModal"
                tabIndex="-1"
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
                      <Link to="/terapeuta-dashboard" className="btn btn-light">
                        Voltar
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3 mt-4">
                <div className="card-header">Editar registo terapêutico</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <TextInputGroup
                      label="Titulo"
                      name="title"
                      placeholder="Introduza um titulo"
                      value={title}
                      onChange={this.onChange}
                      error={errors.title}
                    />
                    <TextAreaFieldGroup
                      label="Observação"
                      name="observation"
                      placeholder="Introduza uma observação"
                      value={observation}
                      onChange={this.onChange}
                      error={errors.observation}
                    />
                    <TextAreaFieldGroup
                      label="Atividade realizada"
                      name="activity"
                      placeholder="Introduza o nome da atividade"
                      value={activity}
                      onChange={this.onChange}
                      error={errors.activity}
                    />

                    <TextAreaFieldGroup
                      label="Comportamento demonstrado"
                      name="behavior"
                      placeholder="Descreva o comportamento demostrado"
                      value={behavior}
                      onChange={this.onChange}
                      error={errors.behavior}
                    />

                    <div className="custom-file mb-4">
                      <input
                        type="file"
                        name="files"
                        className="custom-file-input"
                        id="customFile"
                        placeholder="Faça upload dos ficheiros"
                        onChange={this.onChange}
                        error={errors.files}
                        multiple
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {" "}
                        {filename}
                      </label>
                    </div>

                    <input
                      type="submit"
                      value="Adicionar registo"
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

EditTherapeuticNote.propTypes = {
  updateTherapeuticNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  note: state.patient.note
});

export default connect(
  mapStateToProps,
  { getPatient, updateTherapeuticNote, getTherapeuticNote }
)(withRouter(EditTherapeuticNote));
