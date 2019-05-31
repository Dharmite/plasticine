import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TherapeuticNote extends Component {
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
    } = this.props.TherapeuticNote;

    return (
      <div class="card card-body bg-light mb-3">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-12">
            <h3>{title}</h3>
            <p>{observation}</p>
            <p>{date}</p>
            <a href="#">Detalhes</a>
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
  {}
)(TherapeuticNote);
