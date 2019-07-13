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
        <div class="card">
          <div class="card-body">
            {title ? (
              <h1 class="card-title mb-3" style={{ fontSize: "32px" }}>
                {title}
              </h1>
            ) : null}

            <div>
              <div class="row">
                <div class="col-2-lg">
                  <img
                    className="img-circle elevation-2"
                    src="../dist/img/user7-128x128.jpg"
                    alt="User Avatar"
                  />{" "}
                  {user ? <p className="text-muted mt-2">{user.name}</p> : null}
                </div>
                <div class="col-lg-8 col-md-8 col-sm-12">
                  <p>
                    {" "}
                    {category ? (
                      <span style={{ marginBottom: "16px", fontSize: "28px" }}>
                        <b>{category} / </b>
                      </span>
                    ) : null}
                    {subCategory ? (
                      <span style={{ marginBottom: "16px", fontSize: "18px" }}>
                        <b>{subCategory}</b>
                      </span>
                    ) : null}
                  </p>

                  {observation ? (
                    <p style={{ marginBottom: "16px" }}>{observation}</p>
                  ) : null}
                </div>
              </div>

              <div className="row mt-3">
                {this.props.resource ? (
                  <button
                    className="btn"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white"
                    }}
                  >
                    <Link style={{ color: "black" }} to={`/recurso/${_id}`}>
                      Detalhes
                    </Link>
                  </button>
                ) : null}

                <div>
                  {user ? (
                    this.props.auth ? (
                      this.props.auth.user.id == user._id ? (
                        <button
                          className="btn ml-3"
                          style={{
                            border: "1px solid black",
                            backgroundColor: "white"
                          }}
                        >
                          <Link
                            style={{ color: "black" }}
                            to={`/recurso/editar/${_id}`}
                          >
                            Editar
                          </Link>
                        </button>
                      ) : null
                    ) : null
                  ) : null}
                </div>
                {user ? (
                  this.props.auth ? (
                    this.props.auth.user.id == user._id ? (
                      <button
                        className="btn ml-3"
                        style={{ color: "black" }}
                        data-toggle="modal"
                        data-target="#removeResourceModal"
                        style={{
                          border: "1px solid black",
                          backgroundColor: "white"
                        }}
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
