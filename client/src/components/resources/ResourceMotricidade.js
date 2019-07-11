import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class ResourceMotricidade extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("Motricidade");
  }

  render() {
    let esquema;
    let oculo;
    let grafo;
    let precisao;

    if (this.props.motricidade) {
      esquema = this.props.motricidade.filter(
        resource => resource.subCategory == "Esquema Corporal"
      );
    }
    if (this.props.motricidade) {
      oculo = this.props.motricidade.filter(
        resource => resource.subCategory == "Coordenação óculo-manual"
      );
    }

    if (this.props.motricidade) {
      grafo = this.props.motricidade.filter(
        resource =>
          resource.subCategory == "Coordenação grafo-manual (pré-escrita)"
      );
    }
    if (this.props.motricidade) {
      precisao = this.props.motricidade.filter(
        resource => resource.subCategory == "Precisão Manual"
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
                      <p class="lead text-center">Motricidade</p>
                    </div>
                  </div>

                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="esquema-tab"
                        data-toggle="tab"
                        href="#esquema"
                        role="tab"
                        aria-controls="esquema"
                        aria-selected="true"
                        style={{ fontSize: "14px" }}
                      >
                        Esquema Corporal (
                        {this.props.motricidade ? (
                          <small className="text-muted">{esquema.length}</small>
                        ) : null}
                        )
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="oculo-tab"
                        data-toggle="tab"
                        href="#oculo"
                        role="tab"
                        aria-controls="oculo"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Coordenação óculo-manual (
                        {this.props.motricidade ? (
                          <small className="text-muted">{oculo.length}</small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="grafo-tab"
                        data-toggle="tab"
                        href="#grafo"
                        role="tab"
                        aria-controls="grafo"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Coordenação grafo-manual (pré-escrita) (
                        {this.props.motricidade ? (
                          <small className="text-muted">{grafo.length}</small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="precisao-tab"
                        data-toggle="tab"
                        href="#precisao"
                        role="tab"
                        aria-controls="precisao"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Precisão Manual (
                        {this.props.motricidade ? (
                          <small className="text-muted">
                            {precisao.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="esquema"
                      role="tabpanel"
                      aria-labelledby="esquema-tab"
                    >
                      {this.props.motricidade ? (
                        esquema.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.motricidade
                        ? esquema.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="oculo"
                      role="tabpanel"
                      aria-labelledby="oculo-tab"
                    >
                      {this.props.motricidade ? (
                        oculo.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.motricidade
                        ? oculo.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="grafo"
                      role="tabpanel"
                      aria-labelledby="grafo-tab"
                    >
                      {this.props.motricidade ? (
                        grafo.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.motricidade
                        ? grafo.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="precisao"
                      role="tabpanel"
                      aria-labelledby="precisao-tab"
                    >
                      {this.props.motricidade ? (
                        precisao.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.motricidade
                        ? precisao.map(resource => (
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
  motricidade: state.resource.motricidade
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(ResourceMotricidade));
