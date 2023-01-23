import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Routes>
        <Route
            {...rest}
            render={(props) =>
                auth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Navigate to='/login' />
                )
            }
        />
    </Routes>
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
