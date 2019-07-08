import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeTherapeuticNote } from "../../actions/patientActions";

class TherapeuticNote extends Component {
  onClickRemoveResource = resource_id => {
    this.props.removeTherapeuticNote(resource_id);
  };
  render() {
    const {
      _id,
      user,
      patient,
      title,
      observation,
      date
    } = this.props.TherapeuticNote;

    console.log(user);

    return (
      <div>
        <div
          className="modal fade"
          id="removeResourceModal"
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
                Deseja mesmo remover este recurso?
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
                  onClick={this.onClickRemoveResource.bind(this, _id)}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <h3>{title}</h3>
              <p>
                <b>Observação:</b> {observation}
              </p>
              <p>{date.slice(0, 10)}</p>
              <Link to={`/paciente/${patient}/registo/${_id}`}>Detalhes</Link>
              <Link to={`/paciente/${patient}/registo/${_id}/editar`}>
                Editar
              </Link>
              {user ? (
                this.props.auth ? (
                  this.props.auth.user.id == user._id ? (
                    <button
                      className="btn btn-light"
                      data-toggle="modal"
                      data-target="#removeResourceModal"
                      style={{ border: "1px solid black" }}
                    >
                      Apagar
                    </button>
                  ) : null
                ) : null
              ) : null}
            </div>
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
  auth: state.auth,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { removeTherapeuticNote }
)(withRouter(TherapeuticNote));
