import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getParent } from "../../actions/parentActions";
import TherapeuticNote from "../therapist/TherapeuticNote";

class ParentProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getParent(id);
  }

  render() {
    const { name, email, notes } = this.props.parent;

    let userType;

    if (this.props.user.userType === "admin") {
      userType = "admin";
    } else if (this.props.user.userType === "therapist") {
      userType = "terapeuta";
    } else {
      userType = "parente";
    }

    return (
      <div>
        <div className="row">
          <div className="col-6 mt-3 mb-3">
            <Link to={`/${userType}-dashboard`} className="btn btn-light">
              Voltar
            </Link>{" "}
          </div>

          <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-center">{name}</h1>
                <p className="lead text-center">{email}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h1 class="display-6">Notas</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            {notes
              ? notes.map(note => (
                  <TherapeuticNote key={note._id} TherapeuticNote={note} />
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

ParentProfile.propTypes = {
  parent: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  parent: state.parent.parent
});

export default connect(
  mapStateToProps,
  { getParent }
)(ParentProfile);