import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const componentContent = (
  props,
  { component: Component, auth, patientTherapists }
) => {
  return <Component {...props} />;
};

const redirectContent = (
  props,
  { component: Component, auth, patientTherapists }
) => {
  return <Redirect to="/login" />;
};

let haveAccess = (props, { component: Component, auth, patientTherapists }) => {
  patientTherapists.forEach(therapist => {
    if (auth.user._id === therapist._id) {
      return componentContent(props, {
        component: Component,
        auth,
        patientTherapists
      });
    } else {
      return redirectContent(props, {
        component: Component,
        auth,
        patientTherapists
      });
    }
  });
};

const AccessRoute = ({
  component: Component,
  auth,
  patientTherapists,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      haveAccess(props, { component: Component, auth, patientTherapists })
    }
  />
);

AccessRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  patientTherapists: state.patient.patientTherapists
});

export default connect(mapStateToProps)(AccessRoute);
