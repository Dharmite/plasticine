import React, { Component } from "react";
import TextInputGroup from "../common/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getPatient, addTherapeuticNote } from "../../actions/patientActions";
import $ from "jquery";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class AddNote extends Component {
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
    availableTo2: "",
    files: "",
    filename: "Escolha um ficheiro",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, observation, files, availableTo2 } = this.state;

    let availableTo = "";

    if (availableTo2 !== "") {
      availableTo2.forEach(element => {
        availableTo += element + ",";
      });

      availableTo = availableTo.replace(/,/g, " ");

      availableTo = availableTo.replace(/\s+$/, "");

      let formData = new FormData();
      formData.append("title", title);
      formData.append("observation", observation);
      formData.append("availableTo", availableTo);

      for (var x = 0; x < this.state.files.length; x++) {
        formData.append("files", this.state.files[x]);
      }

      formData.forEach(val => {
        console.log(val, "val");
      });

      const { id } = this.props.match.params;
      this.props.addTherapeuticNote(id, formData);

      this.setState({
        title: "",
        observation: "",
        files: "",
        availableTo2: "",
        errors: {}
      });

      this.props.history.push("/parente-dashboard");
    } else {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("observation", observation);
      formData.append("availableTo", availableTo2);
      for (var x = 0; x < this.state.files.length; x++) {
        formData.append("files", this.state.files[x]);
      }

      const newTherapeuticNote = {
        title,
        observation,
        availableTo2,
        files
      };

      const { id } = this.props.match.params;
      this.props.addTherapeuticNote(id, formData);

      this.setState({
        title: "",
        observation: "",
        files: "",
        availableTo2: "",
        errors: {}
      });

      this.props.history.push("/parente-dashboard");
    }
  };

  handleSelectionChanged = e => {
    let availableTo2 = [];
    let inputElements = document.getElementsByClassName("form-check-input");
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        availableTo2.push(inputElements[i].value);
      }
    }
    this.setState({
      availableTo2: availableTo2
    });
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getPatient(id);
  }

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
      errors,
      availableTo2,
      files,
      filename
    } = this.state;

    let { therapist, parent } = this.props.patient;

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
                      <Link to="/parente-dashboard" className="btn btn-light">
                        Voltar
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3 mt-4">
                <div className="card-header">Adicionar registo terapêutico</div>
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
                      type="text"
                      placeholder="Introduza uma observação"
                      value={observation}
                      onChange={this.onChange}
                      error={errors.observation}
                    />

                    <div className="form-group">
                      <label>Disponível para:</label>
                      {therapist
                        ? therapist.map(elem =>
                            elem._id !== this.props.auth.user.id ? (
                              <div className="form-check mb-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="availableTo2"
                                  id="defaultCheck1"
                                  value={elem._id}
                                  onChange={this.handleSelectionChanged}
                                  error={errors.availableTo2}
                                />
                                <label
                                  className="form-check-label"
                                  for="defaultCheck1"
                                >
                                  {elem.name}
                                </label>
                              </div>
                            ) : null
                          )
                        : null}

                      {parent
                        ? parent.map(elem =>
                            elem._id !== this.props.auth.user.id ? (
                              <div className="form-check mb-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="availableTo2"
                                  id="defaultCheck1"
                                  value={elem._id}
                                  onChange={this.handleSelectionChanged}
                                  error={errors.availableTo2}
                                />
                                <label
                                  className="form-check-label"
                                  for="defaultCheck1"
                                >
                                  {elem.name}
                                </label>
                              </div>
                            ) : null
                          )
                        : null}
                    </div>

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
                      value="Adicionar observação"
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

AddNote.propTypes = {
  addTherapeuticNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  patient: state.patient.patient,
  patientTherapists: state.patient.patientTherapists,
  patientParents: state.patient.patientParents,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPatient, addTherapeuticNote }
)(withRouter(AddNote));
