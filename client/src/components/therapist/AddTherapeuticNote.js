import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getPatient, addTherapeuticNote } from "../../actions/patientActions";

class AddTherapeuticNote extends Component {
  state = {
    title: "",
    observation: "",
    activity: "",
    behavior: "",
    availableTo2: "",
    files: "",
    filename: "Escolha um ficheiro",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      title,
      observation,
      activity,
      behavior,
      files,
      availableTo2
    } = this.state;

    let availableTo = "";

    if (availableTo !== "") {
      availableTo2.forEach(element => {
        availableTo += element + ",";
      });

      availableTo = availableTo.replace(/,/g, " ");

      availableTo = availableTo.replace(/\s+$/, "");

      let formData = new FormData();
      formData.append("title", title);
      formData.append("observation", observation);
      formData.append("activity", activity);
      formData.append("behavior", behavior);
      formData.append("availableTo", availableTo);
      for(var x = 0; x<this.state.files.length; x++) {
        formData.append('files', this.state.files[x])
    }
      // formData.append("files", files);

      console.log(files, "files add component");

      const newTherapeuticNote = {
        title,
        observation,
        activity,
        behavior,
        availableTo,
        files
      };

      console.log(newTherapeuticNote.files, "newTherapeuticNote");

      const { id } = this.props.match.params;
      this.props.addTherapeuticNote(id, formData);

      // Clear State
      this.setState({
        title: "",
        observation: "",
        activity: "",
        behavior: "",
        files: "",
        availableTo2: "",
        errors: {}
      });

      this.props.history.push("/terapeuta-dashboard");
    } else {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("observation", observation);
      formData.append("activity", activity);
      formData.append("behavior", behavior);
      formData.append("availableTo", availableTo);
      for(var x = 0; x<this.state.files.length; x++) {
        formData.append('files', this.state.files[x])
    }
      // formData.append("files", files);
      console.log(files, "files add component");


      const newTherapeuticNote = {
        title,
        observation,
        activity,
        behavior,
        availableTo,
        files
      };

      console.log(newTherapeuticNote.files, "newTherapeuticNote");


      const { id } = this.props.match.params;
      this.props.addTherapeuticNote(id, formData);

      // Clear State
      this.setState({
        title: "",
        observation: "",
        activity: "",
        behavior: "",
        files: "",
        availableTo2: "",
        errors: {}
      });

      this.props.history.push("/terapeuta-dashboard");
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

      console.log(this.state.files, "this.state.files");
      console.log(e.target.files, "e.target.files");
      // let upload_files = [...e.target.files[]];
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
      availableTo2,
      files,
      filename
    } = this.state;

    let { therapist, parent } = this.props.patient;

    console.log(this.props.auth.user, "user");

    return (
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
            <TextInputGroup
              label="Observação"
              name="observation"
              type="text"
              placeholder="Introduza uma observação"
              value={observation}
              onChange={this.onChange}
              error={errors.observation}
            />
            <TextInputGroup
              label="Atividade realizada"
              name="activity"
              type="text"
              placeholder="Introduza o nome da atividade"
              value={activity}
              onChange={this.onChange}
              error={errors.activity}
            />

            <TextInputGroup
              label="Comportamento demonstrado"
              name="behavior"
              type="text"
              placeholder="Descreva o comportamento demostrado"
              value={behavior}
              onChange={this.onChange}
              error={errors.behavior}
            />

            <div className="form-group">
              <label>Disponível para:</label>
              {therapist
                ? therapist.map(elem =>
                    elem._id !== this.props.auth.user._id ? (
                      <div class="form-check mb-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="availableTo2"
                          id="defaultCheck1"
                          value={elem._id}
                          onChange={this.handleSelectionChanged}
                          error={errors.availableTo2}
                        />
                        <label class="form-check-label" for="defaultCheck1">
                          {elem.name}
                        </label>
                      </div>
                    ) : null
                  )
                : null}

              {parent
                ? parent.map(elem =>
                    elem._id !== this.props.auth.user._id ? (
                      <div class="form-check mb-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="availableTo2"
                          id="defaultCheck1"
                          value={elem._id}
                          onChange={this.handleSelectionChanged}
                          error={errors.availableTo2}
                        />
                        <label class="form-check-label" for="defaultCheck1">
                          {elem.name}
                        </label>
                      </div>
                    ) : null
                  )
                : null}
            </div>

            {/* <TextInputGroup
              label="Ficheiros"
              name="files"
              type="file"
              placeholder="Faça upload dos ficheiros"
              value={files}
              onChange={this.onChange}
              error={errors.files}
            /> */}

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
    );
  }
}

AddTherapeuticNote.propTypes = {
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
)(withRouter(AddTherapeuticNote));
