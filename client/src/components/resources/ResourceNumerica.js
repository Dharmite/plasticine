import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class ResourceNumerica extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("Áreas Numéricas");
  }

  render() {
    let conceitos;
    let calculo;
    let raciocinio;

    if (this.props.areas_numericas) {
      conceitos = this.props.areas_numericas.filter(
        resource => resource.subCategory == "Conceitos Numéricos Básicos"
      );
    }
    if (this.props.areas_numericas) {
      calculo = this.props.areas_numericas.filter(
        resource => resource.subCategory == "Cálculo"
      );
    }
    if (this.props.areas_numericas) {
      raciocinio = this.props.areas_numericas.filter(
        resource => resource.subCategory == "Raciocínio Abstrato"
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
                      <p class="lead text-center">Áreas Numéricas</p>
                    </div>
                  </div>

                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="conceitos-tab"
                        data-toggle="tab"
                        href="#conceitos"
                        role="tab"
                        aria-controls="conceitos"
                        aria-selected="true"
                        style={{ fontSize: "14px" }}
                      >
                        Conceitos Numéricos Básicos (
                        {this.props.areas_numericas ? (
                          <small className="text-muted">
                            {conceitos.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="calculo-tab"
                        data-toggle="tab"
                        href="#calculo"
                        role="tab"
                        aria-controls="calculo"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Cálculo (
                        {this.props.areas_numericas ? (
                          <small className="text-muted">{calculo.length}</small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="raciocinio-tab"
                        data-toggle="tab"
                        href="#raciocinio"
                        role="tab"
                        aria-controls="raciocinio"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Raciocínio Abstrato (
                        {this.props.areas_numericas ? (
                          <small className="text-muted">
                            {raciocinio.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="conceitos"
                      role="tabpanel"
                      aria-labelledby="conceitos-tab"
                    >
                      {this.props.areas_numericas ? (
                        conceitos.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.areas_numericas
                        ? conceitos.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="calculo"
                      role="tabpanel"
                      aria-labelledby="calculo-tab"
                    >
                      {this.props.areas_numericas ? (
                        calculo.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.areas_numericas
                        ? calculo.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="raciocinio"
                      role="tabpanel"
                      aria-labelledby="raciocinio-tab"
                    >
                      {this.props.areas_numericas ? (
                        raciocinio.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}{" "}
                      {this.props.areas_numericas
                        ? raciocinio.map(resource => (
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
  areas_numericas: state.resource.areas_numericas
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(ResourceNumerica));
