import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavbarGuest from '../layout/NavbarGuest';

class NotFound extends Component {
    render() {
        if (
            this.props.location.pathname === '/' ||
            this.props.location.pathname === '/register' ||
            this.props.location.pathname === '/login'
        ) {
            return null;
        }

        return (
            <div>
                <NavbarGuest />
                <div className='pageNotFound' style={{ textAlign: 'center' }}>
                    <h1 className='display-4'>
                        <span className='text-danger'>404</span> Página não
                        encontrada
                    </h1>
                    <p className='lead'>A pagina que procura não existe.</p>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(NotFound);
