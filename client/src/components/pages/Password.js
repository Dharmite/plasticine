import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  adminChangePassword,
  therapistChangePassword,
  parentChangePassword
} from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

class Password extends Component {
  state = {
    oldpassword: "",
    newpassword: "",
    newpassword2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const passwordData = {
      oldpassword: this.state.oldpassword,
      newpassword: this.state.newpassword,
      newpassword2: this.state.newpassword2
    };

    if (this.props.auth.user.userType == "admin") {
      this.props.adminChangePassword(passwordData, this.props.history);
    } else if (this.props.auth.user.userType == "therapist") {
      this.props.therapistChangePassword(passwordData, this.props.history);
    } else {
      this.props.parentChangePassword(passwordData, this.props.history);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />
              <div className="password">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">
                        Mudar palavra passe
                      </h1>
                      {this.props.auth ? (
                        <p className="lead text-center">
                          <i className="fas fa-envelope-square"> </i> {this.props.auth.user.email}
                        </p>
                      ) : null}
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input
                            type="password"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.oldpassword
                              }
                            )}
                            placeholder="Insira a sua password atual"
                            name="oldpassword"
                            value={this.state.oldpassword}
                            onChange={this.onChange}
                          />
                          {errors.oldpassword ? (
                            <div className="invalid-feedback">
                              {errors.oldpassword}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.newpassword
                              }
                            )}
                            placeholder="Insira a sua password nova"
                            name="newpassword"
                            value={this.state.newpassword}
                            onChange={this.onChange}
                          />
                          {errors.newpassword ? (
                            <div className="invalid-feedback">
                              {errors.newpassword}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.newpassword2
                              }
                            )}
                            placeholder="Confirme a sua password"
                            name="newpassword2"
                            value={this.state.newpassword2}
                            onChange={this.onChange}
                          />
                          {errors.newpassword2 ? (
                            <div className="invalid-feedback">
                              {errors.newpassword2}
                            </div>
                          ) : null}
                        </div>

                        <input
                          type="submit"
                          className="btn btn-info btn-block mt-4"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { adminChangePassword, therapistChangePassword, parentChangePassword }
)(withRouter(Password));
