import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TherapeuticNote extends Component {
  render() {
    const {
      _id,
      patient,
      title,
      observation,
      date
    } = this.props.TherapeuticNote;

    return (
      <div class="card card-body bg-light mb-3">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-12">
            <h3>{title}</h3>
            <p>
              <b>Observação:</b> {observation}
            </p>
            <p>{date.slice(0, 10)}</p>
            <Link to={`/paciente/${patient}/registo/${_id}`}>Detalhes</Link>
          </div>
        </div>
      </div>
    );
  }
}

TherapeuticNote.propTypes = {
  therapist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(TherapeuticNote);
