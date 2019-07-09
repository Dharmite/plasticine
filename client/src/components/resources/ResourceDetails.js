import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  getResource,
  addComment,
  getComments
} from "../../actions/resourceActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class ResourceDetails extends Component {
  state = {
    observation: "",
    imageName: "",
    errors: {}
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
            <div className="card col-md-4 mt-4">
              <img
                src={process.env.PUBLIC_URL + `/uploads/${file.filename}`}
                class="card-img-top"
              />
              <div className="card-body">
                <button
                  className="btn btn-light mt-3"
                  style={{ border: "1px solid black" }}
                  onClick={this.downloadFile.bind(
                    this,
                    file.filename,
                    file.originalname
                  )}
                >
                  Download {file.originalname}{" "}
                </button>
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
              <button
                className="btn btn-light"
                style={{ border: "1px solid black" }}
                onClick={this.downloadFile.bind(
                  this,
                  file.filename,
                  file.originalname
                )}
              >
                Download {file.originalname}{" "}
              </button>
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
              <button
                className="btn btn-light"
                style={{ border: "1px solid black" }}
                onClick={this.downloadFile.bind(
                  this,
                  file.filename,
                  file.originalname
                )}
              >
                Download {file.originalname}{" "}
              </button>
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
                className="btn btn-light"
                style={{ border: "1px solid black" }}
                onClick={this.downloadFile.bind(
                  this,
                  file.filename,
                  file.originalname
                )}
              >
                Download {file.originalname}{" "}
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
                        Close
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
                        src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
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
                    <div className="card card-body mb-3">
                      <div className="row">
                        <div class="col-md-2">
                          <a href="profile.html">
                            <img
                              class="rounded-circle d-none d-md-block"
                              src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                              alt=""
                              style={{ width: "100%" }}
                            />
                          </a>
                          <br />

                          {elem.user.name ? (
                            <p class="text-center">{this.props.user.name}</p>
                          ) : null}
                          {elem.date ? (
                            <p className="text-center">
                              <small class="text-muted">
                                {elem.date.slice(0, 10)}
                              </small>
                            </p>
                          ) : null}
                        </div>
                        <div className="col-md-10">
                          <p className="lead">{elem.observation}</p>
                          {/* {comment.user === auth.user.id ? (
                      <button
                        onClick={this.onDeleteClick.bind(
                          this,
                          postId,
                          comment._id
                        )}
                        type="button"
                        className="btn btn-danger mr-1"
                      >
                        <i className="fas fa-times" />
                      </button>
                    ) : null} */}
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
  { getResource, addComment, getComments }
)(withRouter(ResourceDetails));
