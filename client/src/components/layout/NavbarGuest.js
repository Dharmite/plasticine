import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class NavbarGuest extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated, isAdmin, isTherapist, isParent } =
            this.props.auth;

        const authLinks = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item dropdown'>
                    <a
                        className='nav-link'
                        data-toggle='dropdown'
                        href='#'
                        style={{ marginBottom: '20px' }}
                    >
                        <span
                            className='badge badge-warning navbar-badge'
                            style={{ fontSize: '15px', marginBottom: '10px' }}
                        >
                            {this.props.auth ? this.props.auth.user.name : null}
                            <i className='fas fa-chevron-circle-down ml-2' />
                        </span>
                    </a>
                    <div className='dropdown-menu dropdown-menu-right'>
                        {isTherapist ? (
                            <Link to='/recursos' className='nav-link'>
                                <span className='dropdown-item dropdown-header'>
                                    Recursos
                                </span>
                            </Link>
                        ) : null}
                        {isTherapist ? (
                            <div className='dropdown-divider' />
                        ) : null}
                        {isTherapist ? (
                            <Link to='/recurso/adicionar' className='nav-link'>
                                <span className='dropdown-item dropdown-header'>
                                    Criar recurso
                                </span>
                            </Link>
                        ) : null}{' '}
                        {isTherapist ? (
                            <div className='dropdown-divider' />
                        ) : null}
                        {isAdmin ? (
                            <Link to='/admin-dashboard' className='nav-link'>
                                <span className='dropdown-item dropdown-header'>
                                    Perfil
                                </span>
                            </Link>
                        ) : null}
                        {isTherapist ? (
                            <Link
                                to='/terapeuta-dashboard'
                                className='nav-link'
                            >
                                <span className='dropdown-item dropdown-header'>
                                    Perfil
                                </span>
                            </Link>
                        ) : null}
                        {isParent ? (
                            <Link to='/parente-dashboard' className='nav-link'>
                                <span className='dropdown-item dropdown-header'>
                                    Perfil
                                </span>
                            </Link>
                        ) : null}
                        <div className='dropdown-divider' />
                        <Link to='/password' className='nav-link'>
                            <span className='dropdown-item dropdown-header'>
                                Mudar password
                            </span>
                        </Link>
                        <div className='dropdown-divider' />
                        <Link
                            to=''
                            onClick={this.onLogoutClick.bind(this)}
                            className='nav-link'
                        >
                            <span className='dropdown-item dropdown-header'>
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
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
                    <div className='container'>
                        <Link className='navbar-brand' to='/'>
                            Plasticine
                        </Link>

                        <button
                            className='navbar-toggler'
                            type='button'
                            data-toggle='collapse'
                            data-target='#navbarResponsive'
                            aria-controls='navbarResponsive'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <span className='navbar-toggler-icon' />
                        </button>

                        <div
                            className='collapse navbar-collapse'
                            id='navbarResponsive'
                        >
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

NavbarGuest.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavbarGuest);
