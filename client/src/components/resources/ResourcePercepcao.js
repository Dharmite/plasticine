import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class ResourcePercepcao extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("Percepção");
  }

  render() {
    let visual;
    let auditiva;
    let espacial;
    let contrastes;
    let temporal;

    if (this.props.percepcao) {
      visual = this.props.percepcao.filter(
        resource => resource.subCategory === "Percepção Visual"
      );
    }
    if (this.props.percepcao) {
      auditiva = this.props.percepcao.filter(
        resource => resource.subCategory === "Percepção Auditiva"
      );
    }

    if (this.props.percepcao) {
      espacial = this.props.percepcao.filter(
        resource => resource.subCategory === "Espacial"
      );
    }
    if (this.props.percepcao) {
      contrastes = this.props.percepcao.filter(
        resource => resource.subCategory === "Contrastes"
      );
    }

    if (this.props.percepcao) {
      temporal = this.props.percepcao.filter(
        resource => resource.subCategory === "Temporal"
      );
    }

    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />
              <div class="resources">
                <div class="container">
                  <div className="row pt-3" style={{ paddingLeft: "7.5px" }}>
                    <Link
                      to={`/recursos`}
                      className="btn"
                      style={{
                        border: "1px solid black",
                        backgroundColor: "white"
                      }}
                    >
                      Voltar
                    </Link>{" "}
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <h1 class="display-4 text-center">Recursos</h1>
                      <p class="lead text-center">Percepção</p>
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
                        Percepção Visual (
                        {this.props.percepcao ? (
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
                        Percepção Auditiva (
                        {this.props.percepcao ? (
                          <small className="text-muted">
                            {auditiva.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="espacial-tab"
                        data-toggle="tab"
                        href="#espacial"
                        role="tab"
                        aria-controls="espacial"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Espacial (
                        {this.props.percepcao ? (
                          <small className="text-muted">
                            {espacial.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="contrastes-tab"
                        data-toggle="tab"
                        href="#contrastes"
                        role="tab"
                        aria-controls="contrastes"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Contrastes (
                        {this.props.percepcao ? (
                          <small className="text-muted">
                            {contrastes.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="temporal-tab"
                        data-toggle="tab"
                        href="#temporal"
                        role="tab"
                        aria-controls="temporal"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Temporal (
                        {this.props.percepcao ? (
                          <small className="text-muted">
                            {temporal.length}
                          </small>
                        ) : null}
                        ){" "}
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
                      {this.props.percepcao ? (
                        visual.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.percepcao
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
                      {this.props.percepcao ? (
                        auditiva.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.percepcao
                        ? auditiva.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="espacial"
                      role="tabpanel"
                      aria-labelledby="espacial-tab"
                    >
                      {this.props.percepcao ? (
                        espacial.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.percepcao
                        ? espacial.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="contrastes"
                      role="tabpanel"
                      aria-labelledby="contrastes-tab"
                    >
                      {this.props.percepcao ? (
                        contrastes.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.percepcao
                        ? contrastes.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temporal"
                      role="tabpanel"
                      aria-labelledby="temporal-tab"
                    >
                      {this.props.percepcao ? (
                        temporal.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.percepcao
                        ? temporal.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
  percepcao: state.resource.percepcao
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(ResourcePercepcao));
