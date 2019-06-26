import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { removeResource } from "../../actions/resourceActions";

class Resource extends Component {
  onClickRemoveResource = resource_id => {
    this.props.removeResource(resource_id);
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
        <div class="card card-body bg-light mb-3">
          <div class="row">
            <div class="col-2">
              <img
                class="rounded-circle"
                style={{ width: "100%" }}
                src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                alt=""
              />
            </div>
            <div class="col-lg-6 col-md-12 col-12">
              {title ? <h1 style={{ marginBottom: "16px" }}>{title}</h1> : null}
              {user ? (
                <p style={{ marginBottom: "16px" }}>{user.name}</p>
              ) : null}
              {subCategory ? (
                <p style={{ marginBottom: "16px" }}>{subCategory}</p>
              ) : null}

              {this.props.resource ? (
                <button
                  className="btn btn-light"
                  style={{ border: "1px solid black" }}
                >
                  <Link to={`/recurso/${_id}`}>Detalhes</Link>
                </button>
              ) : null}

              {user ? (
                this.props.auth ? (
                  this.props.auth.user.id == user._id ? (
                    <button
                      className="btn btn-light"
                      style={{ border: "1px solid black" }}
                    >
                      <Link to={`/recurso/editar/${_id}`}>Editar</Link>
                    </button>
                  ) : null
                ) : null
              ) : null}

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

Resource.propTypes = {
  resource: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { removeResource }
)(Resource);
