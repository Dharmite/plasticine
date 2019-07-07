import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import { connect } from "react-redux";

class Sidebar extends Component {

  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link to="/" className="brand-link">
            <img
              src={Logo}
              alt="Plasticine Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">Plasticine</span>
          </Link>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                {this.props.user.userType == "therapist" ? (
                  <Link to="/terapeuta-dashboard" className="d-block">
                    {this.props.user ? this.props.user.name : null}
                  </Link>
                ) : null}
                {this.props.user.userType == "admin" ? (
                  <Link to="/admin-dashboard" className="d-block">
                    {this.props.user ? this.props.user.name : null}
                  </Link>
                ) : null}
                {this.props.user.userType == "parent" ? (
                  <Link to="/parente-dashboard" className="d-block">
                    {this.props.user ? this.props.user.name : null}
                  </Link>
                ) : null}
              </div>
            </div>
            {/* Sidebar Menu */}
            {this.props.user.userType == "admin" ? (
              <nav className="mt-2">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <li className="nav-header">Utilizadores</li>

                  <li className="nav-item">
                    <Link to="/terapeuta/adicionar" className="nav-link">
                      <i className="nav-icon fa fa-users" />
                      <p>Criar terapeuta</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/paciente/adicionar" className="nav-link">
                      <i class="nav-icon fas fa-child" />
                      <p>Criar paciente</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/parente/adicionar" className="nav-link">
                      <i className="nav-icon fas fa-user-friends" />
                      <p>Criar parente</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : null}
            {this.props.user.userType == "therapist" ? (
              <nav className="mt-2">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <li className="nav-header">Recursos</li>

                  <li className="nav-item">
                    <Link to="/recursos" className="nav-link">
                      <i className="nav-icon far fa-file" />
                      <p>Recursos</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/recurso/adicionar" className="nav-link">
                      <i className="nav-icon fa fa-edit" />
                      <p>Adicionar Recurso</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : null}

            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(withRouter(Sidebar));
