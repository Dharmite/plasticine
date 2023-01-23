import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import NavbarGuest from '../layout/NavbarGuest';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        productKey: '',
        errors: {},
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.isAdmin) {
                this.props.history.push('/admin-dashboard');
            } else if (this.props.auth.isTherapist) {
                this.props.history.push('/terapeuta-dashboard');
            } else if (this.props.auth.isParent) {
                this.props.history.push('/parente-dashboard');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            productKey: this.state.productKey,
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div>
                <NavbarGuest />

                <div className='register'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8 m-auto'>
                                <h1 className='display-4 text-center'>
                                    Registo
                                </h1>
                                <p className='lead text-center'>
                                    Registe-se como administrador da sua
                                    organização
                                </p>
                                <small className='text-muted'>
                                    Todos os campos são obrigatórios
                                </small>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Nome</label>
                                        <input
                                            type='text'
                                            className={classnames(
                                                'form-control form-control-lg',
                                                {
                                                    'is-invalid': errors.name,
                                                }
                                            )}
                                            placeholder='Insira o seu nome'
                                            name='name'
                                            value={this.state.name}
                                            onChange={this.onChange}
                                        />
                                        {errors.name ? (
                                            <div className='invalid-feedback'>
                                                {errors.name}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input
                                            type='email'
                                            className={classnames(
                                                'form-control form-control-lg',
                                                {
                                                    'is-invalid': errors.email,
                                                }
                                            )}
                                            placeholder='Insira o seu email'
                                            name='email'
                                            value={this.state.email}
                                            onChange={this.onChange}
                                        />
                                        {errors.email ? (
                                            <div className='invalid-feedback'>
                                                {errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='password'>
                                            Password
                                        </label>
                                        <input
                                            type='password'
                                            className={classnames(
                                                'form-control form-control-lg',
                                                {
                                                    'is-invalid':
                                                        errors.password,
                                                }
                                            )}
                                            placeholder='Insira uma password'
                                            name='password'
                                            value={this.state.password}
                                            onChange={this.onChange}
                                        />
                                        {errors.password ? (
                                            <div className='invalid-feedback'>
                                                {errors.password}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='password2'>
                                            Confirmar password
                                        </label>
                                        <input
                                            type='password'
                                            className={classnames(
                                                'form-control form-control-lg',
                                                {
                                                    'is-invalid':
                                                        errors.password2,
                                                }
                                            )}
                                            placeholder='Confirme a sua password'
                                            name='password2'
                                            value={this.state.password2}
                                            onChange={this.onChange}
                                        />
                                        {errors.password2 ? (
                                            <div className='invalid-feedback'>
                                                {errors.password2}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='productKey'>
                                            Chave de registo
                                        </label>
                                        <input
                                            type='password'
                                            className={classnames(
                                                'form-control form-control-lg',
                                                {
                                                    'is-invalid':
                                                        errors.productKey,
                                                }
                                            )}
                                            placeholder='Insira a chave de registo'
                                            name='productKey'
                                            value={this.state.productKey}
                                            onChange={this.onChange}
                                        />
                                        {errors.productKey ? (
                                            <div className='invalid-feedback'>
                                                {errors.productKey}
                                            </div>
                                        ) : null}
                                    </div>

                                    <input
                                        type='submit'
                                        className='btn btn-info btn-block mt-4 mb-5'
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
