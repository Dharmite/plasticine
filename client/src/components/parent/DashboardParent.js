import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import Patient from '../patient/Patient';
import { getParent } from '../../actions/parentActions';

class DashboardParent extends Component {
    componentDidMount() {
        this.props.getParent(this.props.user.id);
    }

    render() {
        const { name, patient } = this.props.parent;

        console.log(this.props.parent, 'parent');
        let patientContent;
        if (patient) {
            patientContent =
                patient.length > 0 ? (
                    patient.map((patient) => (
                        <Patient key={patient.id} patient={patient} />
                    ))
                ) : (
                    <h6 className='mt-4'>Nenhum utente disponível</h6>
                );
        }

        return (
            <div>
                <Navbar />
                <div class='content-wrapper'>
                    <section class='content'>
                        <div class='container-fluid'>
                            <Sidebar />
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h1 className='display-4'>
                                        Perfil de familiar
                                    </h1>
                                    <p className='lead text-muted'>
                                        {this.props.user.name}
                                    </p>
                                </div>
                            </div>

                            {patient ? patientContent : null}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

DashboardParent.propTypes = {
    therapists: PropTypes.array.isRequired,
    parents: PropTypes.array.isRequired,
    patients: PropTypes.array.isRequired,
    getPatients: PropTypes.func.isRequired,
    getParents: PropTypes.func.isRequired,
    getTherapists: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    therapists: state.therapist.therapists,
    parents: state.parent.parents,
    patients: state.patient.patients,
    parent: state.parent.parent,
});

export default connect(mapStateToProps, { getParent })(DashboardParent);
