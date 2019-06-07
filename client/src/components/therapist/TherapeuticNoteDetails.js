import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getTherapeuticNote } from "../../actions/patientActions";

class TherapeuticNoteDetails extends Component {
  componentDidMount() {
    const { note_id } = this.props.match.params;
    this.props.getTherapeuticNote(note_id);
  }
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
      date
    } = this.props.note;
    console.log(patient, "patient");

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
  { getTherapeuticNote }
)(withRouter(TherapeuticNoteDetails));
