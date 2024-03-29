import React, { Component } from 'react';
import TextInputGroup from '../common/TextInputGroup';
import { connect } from 'react-redux';
import { getParent, updateParent } from '../../actions/parentActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';

class EditParent extends Component {
    componentWillUnmount() {
        if ($('.modal-backdrop')[0]) {
            document.getElementsByClassName('modal-backdrop')[0].remove();
            document.body.classList.remove('modal-open');
            document.body.style = '';
        }
    }

    state = {
        name: '',
        email: '',
        account_status: '',
        birthday: '',
        relationship: '',
        work_status: '',
        errors: {},
    };

    componentWillReceiveProps(nextProps, nextState) {
        const {
            name,
            email,
            account_status,
            birthday,
            relationship,
            work_status,
        } = nextProps.parent;
        this.setState({
            name,
            email,
            account_status,
            birthday,
            relationship,
            work_status,
        });

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getParent(id);
    }

    radioChange = (event) => {
        this.setState({
            account_status: event.target.value,
        });
    };

    handleSelectionChanged = (e) => {
        let work = [];
        let inputElements = document.getElementsByClassName('form-check-input');
        for (var i = 0; inputElements[i]; ++i) {
            if (inputElements[i].checked) {
                work.push(inputElements[i].value);
            }
        }
        this.setState({
            work_status: work,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            email,
            account_status,
            birthday,
            relationship,
            work_status,
        } = this.state;

        // Check For Errors --> Validation
        const { id } = this.props.match.params;

        const newParent = {
            id,
            name,
            email,
            account_status,
            birthday,
            relationship,
            work_status,
        };

        this.props.updateParent(newParent, this.props.history);

        // Clear State
        this.setState({
            name: '',
            email: '',
            password: '',
            account_status: '',
            birthday: '',
            relationship: '',
            work_status: '',
            errors: {},
        });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const {
            name,
            email,
            account_status,
            errors,
            birthday,
            relationship,
            work_status,
        } = this.state;

        return (
            <div>
                <Navbar />
                <div class='content-wrapper'>
                    <section class='content'>
                        <div class='container-fluid'>
                            <Sidebar />
                            <button
                                type='button'
                                className='btn mt-3'
                                style={{
                                    border: '1px solid black',
                                    backgroundColor: 'white',
                                }}
                                data-toggle='modal'
                                data-target='#backModal'
                            >
                                Voltar
                            </button>
                            <div
                                className='modal fade'
                                id='backModal'
                                tabIndex='-1'
                                role='dialog'
                                aria-labelledby='exampleModalLabel'
                                aria-hidden='true'
                            >
                                <div className='modal-dialog' role='document'>
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h5
                                                className='modal-title'
                                                id='exampleModalLabel'
                                            >
                                                Atenção!
                                            </h5>
                                            <button
                                                type='button'
                                                className='close'
                                                data-dismiss='modal'
                                                aria-label='Close'
                                            >
                                                <span aria-hidden='true'>
                                                    &times;
                                                </span>
                                            </button>
                                        </div>
                                        <div className='modal-body'>
                                            Deseja voltar à pagina anterior? As
                                            alterações não serão guardadas
                                        </div>
                                        <div className='modal-footer'>
                                            <button
                                                type='button'
                                                className='btn btn-secondary'
                                                data-dismiss='modal'
                                            >
                                                Cancelar
                                            </button>
                                            <Link
                                                to='/admin-dashboard'
                                                className='btn btn-light'
                                            >
                                                Voltar
                                            </Link>{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className='card mb-3 mt-4'>
                                <div className='card-header'>
                                    Editar Familiar
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={this.onSubmit}>
                                        <TextInputGroup
                                            label='Nome'
                                            name='name'
                                            placeholder='Introduza o nome'
                                            value={name}
                                            onChange={this.onChange}
                                            error={errors.name}
                                        />
                                        <TextInputGroup
                                            label='Email'
                                            name='email'
                                            type='email'
                                            placeholder='Introduza o Email'
                                            value={email}
                                            onChange={this.onChange}
                                            error={errors.email}
                                        />

                                        <TextInputGroup
                                            label='Data de nascimento'
                                            name='birthday'
                                            type='date'
                                            value={birthday}
                                            onChange={this.onChange}
                                            error={errors.birthday}
                                        />

                                        <TextInputGroup
                                            label='Grau de parentesco'
                                            name='relationship'
                                            placeholder='Introduza o grau de parentesco'
                                            value={relationship}
                                            onChange={this.onChange}
                                            error={errors.relationship}
                                        />

                                        <div class='form-check mb-1'>
                                            <div>
                                                <input
                                                    class='form-check-input'
                                                    type='radio'
                                                    name='work_status'
                                                    id='defaultCheck1'
                                                    value='empregado'
                                                    onChange={
                                                        this
                                                            .handleSelectionChanged
                                                    }
                                                    error={errors.work_status}
                                                />
                                                Empregado/a
                                            </div>
                                            <div>
                                                <input
                                                    class='form-check-input'
                                                    type='radio'
                                                    name='work_status'
                                                    id='defaultCheck1'
                                                    value='desempregado'
                                                    onChange={
                                                        this
                                                            .handleSelectionChanged
                                                    }
                                                    error={errors.work_status}
                                                />
                                                Desempregado/a
                                            </div>
                                        </div>

                                        {account_status ? (
                                            account_status === 'active' ? (
                                                <p>
                                                    <label>
                                                        Estado da conta:{' '}
                                                    </label>{' '}
                                                    <input
                                                        type='radio'
                                                        name='account_status'
                                                        value='active'
                                                        onChange={
                                                            this.radioChange
                                                        }
                                                        checked
                                                    />{' '}
                                                    Ativa{' '}
                                                    <span>
                                                        <input
                                                            type='radio'
                                                            name='account_status'
                                                            value='desactive'
                                                            onChange={
                                                                this.radioChange
                                                            }
                                                        />{' '}
                                                        Desativa
                                                    </span>
                                                </p>
                                            ) : (
                                                <p>
                                                    <label>
                                                        Estado da conta:{' '}
                                                    </label>{' '}
                                                    <input
                                                        type='radio'
                                                        name='account_status'
                                                        value='desactive'
                                                        onChange={
                                                            this.radioChange
                                                        }
                                                        checked
                                                    />{' '}
                                                    Desativa{' '}
                                                    <span>
                                                        <input
                                                            type='radio'
                                                            name='account_status'
                                                            value='active'
                                                            onChange={
                                                                this.radioChange
                                                            }
                                                        />{' '}
                                                        Ativa
                                                    </span>
                                                </p>
                                            )
                                        ) : null}

                                        <input
                                            type='submit'
                                            value='Guardar Familiar'
                                            className='btn btn-info btn-block mt-4'
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

EditParent.propTypes = {
    parent: PropTypes.object.isRequired,
    getParent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    parent: state.parent.parent,
    errors: state.errors,
});

export default connect(mapStateToProps, { getParent, updateParent })(
    EditParent
);
