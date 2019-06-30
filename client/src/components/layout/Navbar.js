import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, isAdmin, isTherapist, isParent } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <span class="badge badge-warning navbar-badge">
              {this.props.auth ? this.props.auth.user.name : null}
            </span>
            <i class="fas fa-chevron-circle-down ml-2" />
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            {isTherapist ? (
              <Link to="/recursos" className="nav-link">
                <span class="dropdown-item dropdown-header">Recursos</span>
              </Link>
            ) : null}
            <div class="dropdown-divider" />
            {isTherapist ? (
              <Link to="/recurso/adicionar" className="nav-link">
                <span class="dropdown-item dropdown-header">Criar recurso</span>
              </Link>
            ) : null}{" "}
            <div class="dropdown-divider" />
            {isAdmin ? (
              <Link to="/admin-dashboard" className="nav-link">
                <span class="dropdown-item dropdown-header">Perfil</span>
              </Link>
            ) : null}
            {isTherapist ? (
              <Link to="/terapeuta-dashboard" className="nav-link">
                <span class="dropdown-item dropdown-header">Perfil</span>
              </Link>
            ) : null}
            {isParent ? (
              <Link to="/parente-dashboard" className="nav-link">
                <span class="dropdown-item dropdown-header">Perfil</span>
              </Link>
            ) : null}
            <div class="dropdown-divider" />
            <Link to="/password" className="nav-link">
              <span class="dropdown-item dropdown-header">Mudar password</span>
            </Link>
            <div class="dropdown-divider" />
            <Link
              to=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <span class="dropdown-item dropdown-header">Sair</span>
            </Link>
          </div>
        </li>
        {/* <li className="nav-item">
          {isTherapist ? (
            <Link to="/recurso/adicionar" className="nav-link">
              Criar recurso
            </Link>
          ) : null}
        </li>
        <li className="nav-item">
          {isTherapist ? (
            <Link to="/recursos" className="nav-link">
              Recursos
            </Link>
          ) : null}
        </li>
        <li className="nav-item">
          {isAdmin ? (
            <Link to="/admin-dashboard" className="nav-link">
              Perfil
            </Link>
          ) : null}

          {isTherapist ? (
            <Link to="/terapeuta-dashboard" className="nav-link">
              Perfil
            </Link>
          ) : null}

          {isParent ? (
            <Link to="/parente-dashboard" className="nav-link">
              Perfil
            </Link>
          ) : null}
        </li>
        <li className="nav-item">
          <Link to="/password" className="nav-link">
            Mudar password
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Sair
          </Link>
        </li> */}
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Registo
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Entrar
          </Link>
        </li>
      </ul>
    );

    return (
      //Navigation
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Plasticine
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
