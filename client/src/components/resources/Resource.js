import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Resource extends Component {
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
    console.log(this.props.resource);

    return (
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
            {user ? <p style={{ marginBottom: "16px" }}>{user.name}</p> : null}
            {subCategory ? (
              <p style={{ marginBottom: "16px" }}>{subCategory}</p>
            ) : null}
            <Link to={`/recurso/${_id}`}>Detalhes</Link>
          </div>
        </div>
      </div>
    );
  }
}

Resource.propTypes = {
  resource: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(Resource);
