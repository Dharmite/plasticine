import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  getResource,
  addComment,
  getComments,
  removeResourceFile
} from "../../actions/resourceActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import doctor_pic from "../../img/doctor.png";
import user_pic from "../../img/user.png";

class ResourceDetails extends Component {
  state = {
    observation: "",
    imageName: "",
    fileName: "",
    errors: {}
  };

  onClickRemoveResourceFile = filename => {
    const { id } = this.props.match.params;
    this.props.removeResourceFile(id, filename);
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getResource(id);
  }
  componentDidUpdate() {
    const { id } = this.props.match.params;
    this.props.getResource(id);
  }
  onSubmit = e => {
    e.preventDefault();

    const { _id } = this.props.resource;
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

  getFile = filename => {
    this.setState({ fileName: filename });
  };

  downloadFile = (filename, originalname) => {
    // axios.get(`/api/therapeuticNote/${filename}/download`);
    axios({
      url: `/api/resource/${filename}/download`, //your url
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
      _id,
      user,
      title,
      category,
      subCategory,
      observation,
      application,
      feedback,
      files,
      date
    } = this.props.resource;
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
            <div className="card col-md-5 mt-4 mr-5">
              <img
                src={process.env.PUBLIC_URL + `/uploads/${file.filename}`}
                class="card-img-top"
                data-toggle="modal"
                data-target="#zoomImageModal"
                onClick={this.getFileName.bind(this, file.filename)}
                style={{ cursor: "pointer" }}
              />
              <div className="card-footer bg-white">
                {user ? (
                  user._id == this.props.user.id ? (
                    <div className="row">
                      <div className="col-md-3 col-sm-4 border-right">
                        <div className="bg-white text-center">
                          <button
                            type="button"
                            className="btn mt-3"
                            style={{ border: "1px solid black" }}
                            data-toggle="modal"
                            data-target="#zoomImageModal"
                            onClick={this.getFileName.bind(this, file.filename)}
                          >
                            Ver
                          </button>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-4 border-right">
                        <div className="bg-white text-center">
                          <button
                            className="btn mt-3"
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
                      <div className="col-md-3 col-sm-4">
                        <div className="bg-white text-center">
                          <button
                            data-toggle="modal"
                            data-target="#deleteFileModal"
                            className="btn mt-3"
                            style={{ border: "1px solid black" }}
                            onClick={this.getFile.bind(this, file.originalname)}
                          >
                            Apagar
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-md-6 col-sm-6 border-right">
                        <div className="bg-white text-center">
                          <button
                            type="button"
                            className="btn mt-3"
                            style={{ border: "1px solid black" }}
                            data-toggle="modal"
                            data-target="#zoomImageModal"
                            onClick={this.getFileName.bind(this, file.filename)}
                          >
                            Ver
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="bg-white text-center">
                          <button
                            className="btn mt-3"
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
                  )
                ) : null}
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
                    src={
                      process.env.PUBLIC_URL + `/uploads/${file.originalname}`
                    }
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </p>
              <p>
                {" "}
                {file.originalname}{" "}
                <button
                  className="btn btn-light mr-3"
                  style={{ border: "1px solid black" }}
                  onClick={this.downloadFile.bind(
                    this,
                    file.filename,
                    file.originalname
                  )}
                >
                  Download
                </button>
                {user ? (
                  user._id == this.props.user.id ? (
                    <button
                      data-toggle="modal"
                      data-target="#deleteFileModal"
                      className="btn"
                      style={{ border: "1px solid black" }}
                      onClick={this.getFile.bind(this, file.originalname)}
                    >
                      Apagar
                    </button>
                  ) : null
                ) : null}
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
                  className="btn btn-light mr-3"
                  style={{ border: "1px solid black" }}
                  onClick={this.downloadFile.bind(
                    this,
                    file.filename,
                    file.originalname
                  )}
                >
                  Download
                </button>
                {user ? (
                  user._id == this.props.user.id ? (
                    <button
                      data-toggle="modal"
                      data-target="#deleteFileModal"
                      className="btn"
                      style={{ border: "1px solid black" }}
                      onClick={this.getFile.bind(this, file.originalname)}
                    >
                      Apagar
                    </button>
                  ) : null
                ) : null}
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
            <div className="col-md-12 mt-3">
              <p>
                <video controls style={{ width: "50%", height: "50%" }}>
                  <source
                    src={process.env.PUBLIC_URL + `/uploads/${file.filename}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </video>
              </p>
              <button
                className="btn btn-light mr-3"
                style={{ border: "1px solid black" }}
                onClick={this.downloadFile.bind(
                  this,
                  file.filename,
                  file.originalname
                )}
              >
                Download
              </button>
              {user ? (
                  user._id == this.props.user.id ? (
                    <button
                      data-toggle="modal"
                      data-target="#deleteFileModal"
                      className="btn"
                      style={{ border: "1px solid black" }}
                      onClick={this.getFile.bind(this, file.originalname)}
                    >
                      Apagar
                    </button>
                  ) : null
                ) : null}
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

              <div
                class="modal fade"
                id="deleteFileModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Atenção!
                      </h5>
                    </div>

                    <div class="modal-body">
                      Deseja mesmo remover este ficheiro?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={this.onClickRemoveResourceFile.bind(
                          this,
                          this.state.fileName
                        )}
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

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

              {this.props.resource ? (
                <div className="col-md-8 mt-3 mb-3">
                  <Link
                    to={`/recursos`}
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
              <div class="card card-body mb-3 mt-3">
                <div className="row d-flex justify-content-center">
                  {" "}
                  {title ? <h2>{title}</h2> : null}
                </div>
                <div class="row">
                  <div class="col-md-2">
                    <a href="profile.html">
                      <img
                        class="rounded-circle d-none d-md-block"
                        src={doctor_pic}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </a>
                    <br />

                    {user ? <p class="text-center">{user.name}</p> : null}
                    {date ? (
                      <p className="text-center">
                        <small class="text-muted">{date.slice(0, 10)}</small>
                      </p>
                    ) : null}
                  </div>
                  <div class="col-md-10">
                    <div className="row">
                      {observation ? (
                        <p class="lead">
                          {" "}
                          <b>Observação</b> {observation}
                        </p>
                      ) : null}
                    </div>
                    <div className="row">
                      {category ? (
                        <p class="lead">
                          {" "}
                          <b>Categoria:</b> {category}
                        </p>
                      ) : null}
                    </div>
                    <div className="row">
                      {subCategory ? (
                        <p class="lead">
                          {" "}
                          <b>Sub categoria:</b> {subCategory}
                        </p>
                      ) : null}
                    </div>
                    <div className="row">
                      {application ? (
                        <p class="lead">
                          {" "}
                          <b>URL da aplicação:</b> {application}
                        </p>
                      ) : null}
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
                      className="card card-body card-comments mt-5 mb-5"
                      style={{ backgroundColor: "white" }}
                    >
                      <div className="card-comment">
                        {elem.user.userType == "therapist" ? (
                          <img
                            className="img-circle img-sm"
                            src={doctor_pic}
                            alt="User Image"
                          />
                        ) : (
                          <img
                            className="img-circle img-sm"
                            src={user_pic}
                            alt="User Image"
                          />
                        )}

                        <div className="comment-text">
                          {elem.user.userType == "therapist" ? (
                            <span className="username">
                              <Link
                                style={{ color: "black" }}
                                to={`/terapeuta/${elem.user._id}`}
                              >
                                {elem.user.name}
                              </Link>
                              <span className="text-muted float-right">
                                {elem.date.slice(0, 10)}{" "}
                                {elem.date.slice(11, 19)}
                              </span>
                            </span>
                          ) : (
                            <span className="username">
                              <Link
                                style={{ color: "black" }}
                                to={`/parente/${elem.user._id}`}
                              >
                                {elem.user.name}
                              </Link>
                              <span className="text-muted float-right">
                                {elem.date.slice(0, 10)}{" "}
                                {elem.date.slice(11, 19)}
                              </span>
                            </span>
                          )}
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

// ResourceDetails.propTypes = {
//   therapist: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  user: state.auth.user,
  resource: state.resource.resource
});

export default connect(
  mapStateToProps,
  { getResource, addComment, getComments, removeResourceFile }
)(withRouter(ResourceDetails));
