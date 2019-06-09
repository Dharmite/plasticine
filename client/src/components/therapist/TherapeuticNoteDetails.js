import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getTherapeuticNote, addComment, getComments } from "../../actions/patientActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

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
    this.props.getComments(note_id)
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
    console.log(feedback, "feedback");
    const { errors } = this.state;

    return (
      <div>
        {patient ? (
          <div className="col-md-8 mt-3 mb-3">
            <Link to={`/paciente/ver/${patient._id}`} className="btn btn-light">
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
              <div className="row">
                {availableTo ? <p>Disponível para:</p> : null}
                {availableTo
                  ? availableTo.map(elem => <p> {elem.name} </p>)
                  : null}
              </div>
            </div>
          </div>
        </div>
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

                    {this.props.user.name ? <p class="text-center">{this.props.user.name}</p> : null}
                    {elem.date ? (
                      <p className="text-center">
                        <small class="text-muted">{elem.date.slice(0, 10)}</small>
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
        <div className="post-form mb-3">
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
