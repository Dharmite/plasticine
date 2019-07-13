import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  getTherapeuticNote,
  addComment,
  getComments
} from "../../actions/patientActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import user_img from "../../img/user1.jpg";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class TherapeuticNoteDetails extends Component {
  state = {
    observation: "",
    errors: {}
  };
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  componentDidMount() {
    const { note_id } = this.props.match.params;
    this.props.getTherapeuticNote(note_id);
    this.props.getComments(note_id);
  }

  componentDidUpdate() {
    const { note_id } = this.props.match.params;
    this.props.getComments(note_id);
  }

  onSubmit = e => {
    e.preventDefault();

    const { _id } = this.props.note;
    console.log(_id, "note_id");

    console.log(this.props.user.id, "id");
    const newFeedback = {
      user: this.props.user.id,
      observation: this.state.observation
    };

    this.props.addComment(_id, newFeedback);
    this.setState({ observation: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getFileName = filename => {
    this.setState({ imageName: filename });
  };

  downloadFile = (filename, originalname) => {
    // axios.get(`/api/therapeuticNote/${filename}/download`);
    axios({
      url: `/api/therapeuticNote/${filename}/download`, //your url
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", originalname); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    const {
      user,
      patient,
      title,
      observation,
      activity,
      behavior,
      availableTo,
      files,
      feedback,
      date
    } = this.props.note;
    const { errors } = this.state;
    let hasImageFiles;
    if (files) {
      hasImageFiles =
        files.filter(
          file =>
            file.fileType == "image/jpeg" ||
            file.fileType == "image/png" ||
            file.fileType == "image/gif"
        ).length > 0;
    }

    let image_files = files
      ? files.map(file =>
          file.fileType == "image/jpeg" ||
          file.fileType == "image/png" ||
          file.fileType == "image/gif" ? (
            <div className="card col-md-4 mt-4">
              <img
                src={process.env.PUBLIC_URL + `/uploads/${file.filename}`}
                class="card-img-top"
                data-toggle="modal"
                data-target="#zoomImageModal"
                onClick={this.getFileName.bind(this, file.filename)}
                style={{ cursor: "pointer" }}
              />
              <div className="card-footer bg-white">
                <div className="row">
                  <div className="col-sm-6 border-right">
                    <div className="description-block bg-white">
                      <button
                        type="button"
                        className="btn btn-light mt-3"
                        style={{ border: "1px solid black" }}
                        data-toggle="modal"
                        data-target="#zoomImageModal"
                        onClick={this.getFileName.bind(this, file.filename)}
                      >
                        Ver imagem
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="description-block bg-white">
                      <button
                        className="btn btn-light mt-3"
                        style={{ border: "1px solid black" }}
                        onClick={this.downloadFile.bind(
                          this,
                          file.filename,
                          file.originalname
                        )}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )
      : null;
    let hasAudioFiles;
    if (files) {
      hasAudioFiles =
        files.filter(
          file =>
            file.fileType == "audio/aac" ||
            file.fileType == "audio/ogg" ||
            file.fileType == "audio/x-wav" ||
            file.fileType == "audio/mp3"
        ).length > 0;
    }

    let audio_files = files
      ? files.map(file =>
          file.fileType == "audio/aac" ||
          file.fileType == "audio/ogg" ||
          file.fileType == "audio/x-wav" ||
          file.fileType == "audio/mp3" ? (
            <div className="col-md-12 mt-3">
              <p>
                <audio controls>
                  <source
                    src={process.env.PUBLIC_URL + `/uploads/${file.filename}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </p>
              <p>
                {file.originalname}{" "}
                <button
                  className="btn btn-light"
                  style={{ border: "1px solid black" }}
                  onClick={this.downloadFile.bind(
                    this,
                    file.filename,
                    file.originalname
                  )}
                >
                  Download
                </button>
              </p>
            </div>
          ) : null
        )
      : null;

    let hasApplicationFiles;
    if (files) {
      hasApplicationFiles =
        files.filter(
          file =>
            file.fileType == "application/pdf" ||
            file.fileType == "application/msword"
        ).length > 0;
    }
    let application_files = files
      ? files.map(file =>
          file.fileType == "application/pdf" ||
          file.fileType == "application/msword" ? (
            <div className="col-md-12 mt-3">
              <p>
                {file.originalname}{" "}
                <button
                  className="btn btn-light"
                  style={{ border: "1px solid black" }}
                  onClick={this.downloadFile.bind(
                    this,
                    file.filename,
                    file.originalname
                  )}
                >
                  Download
                </button>
              </p>
            </div>
          ) : null
        )
      : null;

    let hasVideoFiles;
    if (files) {
      hasVideoFiles =
        files.filter(
          file =>
            file.fileType == "video/x-msvideo" ||
            file.fileType == "video/mpeg" ||
            file.fileType == "video/ogg" ||
            file.fileType == "video/mp4"
        ).length > 0;
    }

    let video_files = files
      ? files.map(file =>
          file.fileType == "video/x-msvideo" ||
          file.fileType == "video/mpeg" ||
          file.fileType == "video/ogg" ||
          file.fileType == "video/mp4" ? (
            <div className="col-md-12">
              <p>
                <video controls style={{ width: "350px", height: "250px" }}>
                  <source
                    src={process.env.PUBLIC_URL + `/uploads/${file.filename}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </video>
              </p>
              <button
                className="btn btn-light"
                style={{ border: "1px solid black" }}
                onClick={this.downloadFile.bind(
                  this,
                  file.filename,
                  file.originalname
                )}
              >
                Download
              </button>
            </div>
          ) : null
        )
      : null;
    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />
              {patient ? (
                <div className="col-md-8 mt-3 mb-3">
                  <Link
                    to={`/paciente/ver/${patient._id}`}
                    className="btn"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white"
                    }}
                  >
                    Voltar
                  </Link>
                </div>
              ) : null}

              <div
                class="modal fade"
                id="zoomImageModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-body">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/uploads/${this.state.imageName}`
                        }
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div class="card card-body mb-3 mt-3">
                    {title ? <h2>{title}</h2> : null}
                    <div className="row">
                      <div class="col-md-3">
                        <img
                          src={user_img}
                          className="img-circle elevation-2"
                          alt="User Image"
                          style={{ height: "128px", width: "128px" }}
                        />

                        <br />
                        {user ? (
                          <Link to={`/terapeuta/${user._id}`}>
                            <p className="mt-3">{user.name}</p>
                          </Link>
                        ) : null}
                        {/* {user ? <p class="text-center">{user.name}</p> : null} */}
                        {date ? (
                          <p>
                            <small class="text-muted">
                              {date.slice(0, 10)}
                            </small>
                          </p>
                        ) : null}
                      </div>

                      <div class="col-md-9">
                        <div className="row">
                          {observation ? (
                            <p class="lead">
                              {" "}
                              <b>Observação</b> {observation}
                            </p>
                          ) : null}
                        </div>
                        <div className="row">
                          {activity ? (
                            <p class="lead">
                              {" "}
                              <b>Atividade:</b> {activity}
                            </p>
                          ) : null}
                        </div>
                        <div className="row">
                          {behavior ? (
                            <p class="lead">
                              {" "}
                              <b>Comportamento:</b> {behavior}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-3">
                  {" "}
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">Utilizadores</h3>
                    </div>

                    {/* /.card-header */}
                    <div className="card-body p-0">
                      <ul className="products-list product-list-in-card pl-2 pr-2">
                        {availableTo
                          ? availableTo.map(elem => (
                              <li class="item">
                                <li className="product-img">
                                  <div className="product-img">
                                    <img
                                      src={user_img}
                                      alt="Product Image"
                                      className="img-circle"
                                    />
                                  </div>
                                  <div className="product-info">
                                    <a className="product-title">
                                      <Link
                                        className="product-description"
                                        to={`/terapeuta/${elem._id}`}
                                      >
                                        {elem.name}
                                      </Link>
                                      <span class="badge float-right"> </span>
                                    </a>

                                    <span
                                      className="product-description"
                                      style={{ marginRight: "0px!important" }}
                                    >
                                      <b>Email: </b>
                                      {elem.email}
                                    </span>
                                    <span className="product-description">
                                      <b>Especialidade: </b>
                                      {elem.specialty}
                                    </span>
                                  </div>
                                </li>
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {hasImageFiles ? (
                <div className="container row">
                  <h1>Imagens</h1>
                </div>
              ) : null}
              <div className="row">{image_files}</div>
              {hasApplicationFiles ? (
                <div className="container row">
                  <h1>Ficheiros</h1>
                </div>
              ) : null}
              <div className="row">{application_files}</div>
              {hasAudioFiles ? (
                <div className="container row">
                  <h1>Audio</h1>
                </div>
              ) : null}
              <div className="row">{audio_files}</div>
              {hasVideoFiles ? (
                <div className="container row">
                  <h1>Video</h1>
                </div>
              ) : null}
              <div className="row">{video_files}</div>
              {feedback
                ? feedback.map(elem => (
                    <div
                      className="card-footer card-comments mt-5 mb-5"
                      style={{ backgroundColor: "#f4f6f9" }}
                    >
                      <div className="card-comment">
                        <img
                          className="img-circle img-sm"
                          src={user_img}
                          alt="User Image"
                        />
                        <div className="comment-text">
                          {elem.user.name ? (
                            <span className="username">
                              {this.props.user.name}
                              <span className="text-muted float-right">
                                {elem.date.slice(0, 10)}
                              </span>
                            </span>
                          ) : null}
                          {elem.observation}{" "}
                        </div>
                      </div>
                    </div>
                  ))
                : null}

              <div className="post-form mb-3 mt-3">
                <div className="card card-info">
                  <div className="card-header bg-info text-white">
                    Faça um comentário...
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <TextAreaFieldGroup
                          placeholder="Dê feedback a este registo"
                          name="observation"
                          value={this.state.observation}
                          onChange={this.onChange}
                          error={errors.observation}
                        />
                      </div>
                      <button type="submit" className="btn btn-dark">
                        Dar feedback
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

TherapeuticNoteDetails.propTypes = {
  therapist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  note: state.patient.note
});

export default connect(
  mapStateToProps,
  { getTherapeuticNote, addComment, getComments }
)(withRouter(TherapeuticNoteDetails));
