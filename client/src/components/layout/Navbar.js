import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated, isAdmin, isTherapist, isParent } =
            this.props.auth;

        const authLinks = (
            <ul className='navbar-nav ml-auto'>
                <li class='nav-item dropdown'>
                    <a class='nav-link' data-toggle='dropdown' href='#'>
                        <span
                            class='badge badge-warning navbar-badge'
                            style={{ fontSize: '15px', padding: '7px' }}
                        >
                            {this.props.auth ? this.props.auth.user.name : null}
                            <i class='fas fa-chevron-circle-down ml-2' />
                        </span>
                    </a>
                    <div class='dropdown-menu dropdown-menu-right'>
                        {isAdmin ? (
                            <Link to='/admin-dashboard' className='nav-link'>
                                <span class='dropdown-item dropdown-header'>
                                    Perfil
                                </span>
                            </Link>
                        ) : null}
                        {isTherapist ? (
                            <Link
                                to='/terapeuta-dashboard'
                                className='nav-link'
                            >
                                <span class='dropdown-item dropdown-header'>
                                    Perfil
                                </span>
                            </Link>
                        ) : null}
                        {isParent ? (
                            <Link to='/parente-dashboard' className='nav-link'>
                                <span class='dropdown-item dropdown-header'>
                                    Perfil
                                </span>
                            </Link>
                        ) : null}
                        <div class='dropdown-divider' />
                        <Link to='/password' className='nav-link'>
                            <span class='dropdown-item dropdown-header'>
                                Mudar password
                            </span>
                        </Link>
                        <div class='dropdown-divider' />
                        <Link
                            to=''
                            onClick={this.onLogoutClick.bind(this)}
                            className='nav-link'
                        >
                            <span class='dropdown-item dropdown-header'>
                                Sair
                            </span>
                        </Link>
                    </div>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/register'>
                        Registar
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                        Entrar
                    </Link>
                </li>
            </ul>
        );

        return (
            //Navigation
            <header>
                <nav className='main-header navbar navbar-expand bg-white navbar-light border-bottom'>
                    {/* Left navbar links */}
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <a
                                className='nav-link'
                                data-widget='pushmenu'
                                href='#'
                            >
                                <i className='fa fa-bars' />
                            </a>
                        </li>
                    </ul>
                    {isAuthenticated ? authLinks : guestLinks}
                </nav>
            </header>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
