import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";

class ResourceNumerica extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("Áreas Numéricas");
  }

  render() {
    return (
      <div class="resources">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4 text-center">Recursos</h1>
              <p class="lead text-center">Áreas Numéricas</p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <h1 class="display-6">Áreas Numéricas</h1>
              {this.props.areas_numericas
                ? this.props.areas_numericas.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// DashboardResources.propTypes = {
//   therapists: PropTypes.array.isRequired,
//   parents: PropTypes.array.isRequired,
//   patients: PropTypes.array.isRequired,
//   getPatients: PropTypes.func.isRequired,
//   getParents: PropTypes.func.isRequired,
//   getTherapists: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  user: state.auth.user,
  areas_numericas: state.resource.areas_numericas
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(ResourceNumerica));
