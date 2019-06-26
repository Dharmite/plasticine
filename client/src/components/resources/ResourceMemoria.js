import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";

class ResourceMemoria extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("Memória");
  }

  render() {
    let auditiva;
    let visual;
    let numerica_repetitiva;
    let numerica_significativa;

    if (this.props.memoria) {
      visual = this.props.memoria.filter(
        resource => resource.subCategory == "Memória Visual"
      );
    }
    if (this.props.memoria) {
      auditiva = this.props.memoria.filter(
        resource => resource.subCategory == "Memória Auditiva"
      );
    }
    if (this.props.memoria) {
      numerica_repetitiva = this.props.memoria.filter(
        resource => resource.subCategory == "Verbal e Numérica Repetitiva"
      );
    }
    if (this.props.memoria) {
      numerica_significativa = this.props.memoria.filter(
        resource => resource.subCategory == "Verbal e Numérica Significativa"
      );
    }

    return (
      <div class="resources">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4 text-center">Recursos</h1>
              <p class="lead text-center">Memória</p>
            </div>
          </div>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="visual-tab"
                data-toggle="tab"
                href="#visual"
                role="tab"
                aria-controls="visual"
                aria-selected="true"
                style={{ fontSize: "14px" }}
              >
                Memória Visual (
                {this.props.memoria ? (
                  <small className="text-muted">{visual.length}</small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="auditiva-tab"
                data-toggle="tab"
                href="#auditiva"
                role="tab"
                aria-controls="auditiva"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Memória Auditiva (
                {this.props.memoria ? (
                  <small className="text-muted">{auditiva.length}</small>
                ) : null}
                ){" "}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="numerica_repetitiva-tab"
                data-toggle="tab"
                href="#numerica_repetitiva"
                role="tab"
                aria-controls="numerica_repetitiva"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Verbal e Numérica Repetitiva (
                {this.props.memoria ? (
                  <small className="text-muted">
                    {numerica_repetitiva.length}
                  </small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="numerica_significativa-tab"
                data-toggle="tab"
                href="#numerica_significativa"
                role="tab"
                aria-controls="numerica_significativa"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Verbal e Numérica Significativa (
                {this.props.memoria ? (
                  <small className="text-muted">
                    {numerica_significativa.length}
                  </small>
                ) : null}
                )
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="visual"
              role="tabpanel"
              aria-labelledby="visual-tab"
            >
              {this.props.memoria ? (
                visual.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}
              {this.props.memoria
                ? visual.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
            <div
              class="tab-pane fade"
              id="auditiva"
              role="tabpanel"
              aria-labelledby="auditiva-tab"
            >
              {this.props.memoria ? (
                auditiva.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}
              {this.props.memoria
                ? auditiva.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
            <div
              class="tab-pane fade"
              id="numerica_repetitiva"
              role="tabpanel"
              aria-labelledby="numerica_repetitiva-tab"
            >
              {this.props.memoria ? (
                numerica_repetitiva.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.memoria
                ? numerica_repetitiva.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
            <div
              class="tab-pane fade"
              id="numerica_significativa"
              role="tabpanel"
              aria-labelledby="numerica_significativa-tab"
            >
              {this.props.memoria ? (
                numerica_significativa.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.memoria
                ? numerica_significativa.map(resource => (
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
  memoria: state.resource.memoria
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(ResourceMemoria));
