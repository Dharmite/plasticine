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

    console.log(user._id, "user_id");
    console.log(this.props.user.id, "props.id");

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
        <div className="row">
          {this.props.user ? (
            user ? (
              this.props.user.id == user._id ? (
                <div className="card card-body">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="row" style={{ display: "flex" }}>
       
                      <div className="col-12">
                        <p style={{ float: "right" }}>{date.slice(0, 10)}</p>

                        <h3>{title}</h3>
                        <p>
                          <b>Observação:</b> {observation}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="description-block mr-3">
                        <Link
                          className="btn"
                          style={{ border: "1px solid black" }}
                          to={`/paciente/${patient}/registo/${_id}`}
                        >
                          Detalhes
                        </Link>
                      </div>
                      <div className="description-block mr-3">
                        <Link
                          className="btn"
                          style={{ border: "1px solid black" }}
                          to={`/paciente/${patient}/registo/${_id}/editar`}
                        >
                          Editar
                        </Link>
                      </div>
                      <div className="description-block mr-3">
                        {user ? (
                          this.props.auth ? (
                            this.props.auth.user.id == user._id ? (
                              <button
                                className="btn"
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
              ) :                 <div className="card card-body">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="row" style={{ display: "flex" }}>
                  <div className="col-2">
                    <img
                      class="profile-user-img img-responsive img-circle"
                      src="../../dist/img/user4-128x128.jpg"
                      alt="User profile picture"
                    />
                    {user ? (
                      <p className="text-muted mt-2">{user.name}</p>
                    ) : null}
                  </div>
                  <div className="col-10">
                    <p style={{ float: "right" }}>{date.slice(0, 10)}</p>

                    <h3>{title}</h3>
                    <p>
                      <b>Observação:</b> {observation}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="description-block mr-3">
                    <Link
                      className="btn"
                      style={{ border: "1px solid black" }}
                      to={`/paciente/${patient}/registo/${_id}`}
                    >
                      Detalhes
                    </Link>
                  </div>
                  <div className="description-block mr-3">
                    <Link
                      className="btn"
                      style={{ border: "1px solid black" }}
                      to={`/paciente/${patient}/registo/${_id}/editar`}
                    >
                      Editar
                    </Link>
                  </div>
                  <div className="description-block mr-3">
                    {user ? (
                      this.props.auth ? (
                        this.props.auth.user.id == user._id ? (
                          <button
                            className="btn"
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
            ) : null
          ) : null}
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
