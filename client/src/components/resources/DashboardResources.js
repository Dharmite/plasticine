import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class DashboardResources extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("Percepção");
    this.props.getResourceByCategory("Motricidade");
    this.props.getResourceByCategory("Desenvolvimento Verbal");
    this.props.getResourceByCategory("Memória");
    this.props.getResourceByCategory("Áreas Numéricas");
    this.props.getResourceByCategory("Desenvolvimento Emocional-Social");
    this.props.getResourceByCategory("AVD's");
  }

  render() {
    let categories = [
      "Percepção",
      "Motricidade",
      "Desenvolvimento Verbal",
      "Memória",
      "Áreas Numéricas",
      "Desenvolvimento Emocional-Social",
      "AVD's"
    ];

    let percepcao_resources_all = this.props.percepcao;
    let percepcao_resources = this.props.percepcao.slice().reverse();
    percepcao_resources = percepcao_resources.slice(0, 3);

    let motricidade_resources_all = this.props.motricidade;
    let motricidade_resources = this.props.motricidade.slice().reverse();
    motricidade_resources = motricidade_resources.slice(0, 3);

    let desenvolvimento_verbal_resources_all = this.props
      .desenvolvimento_verbal;
    let desenvolvimento_verbal_resources = this.props.desenvolvimento_verbal
      .slice()
      .reverse();
    desenvolvimento_verbal_resources = desenvolvimento_verbal_resources.slice(
      0,
      3
    );

    let memoria_resources_all = this.props.memoria;
    let memoria_resources = this.props.memoria.slice().reverse();
    memoria_resources = memoria_resources.slice(0, 3);

    let areas_numericas_resources_all = this.props.areas_numericas;
    let areas_numericas_resources = this.props.areas_numericas
      .slice()
      .reverse();
    areas_numericas_resources = areas_numericas_resources.slice(0, 3);

    let emocional_social_resources_all = this.props.emocional_social;
    let emocional_social_resources = this.props.emocional_social
      .slice()
      .reverse();
    emocional_social_resources = emocional_social_resources.slice(0, 3);

    let avd_resources_all = this.props.avd;
    let avd_resources = this.props.avd.slice().reverse();
    avd_resources = avd_resources.slice(0, 3);

    console.log(percepcao_resources.length, "teste!!");
    return (
      <div>
        <Navbar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Sidebar />

              <div class="resources">
                <div class="container">
                  <div class="row">
                    <div class="col-md-12">
                      <h1 class="display-4 text-center">Categorias de Recursos</h1>
                    </div>
                  </div>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="percepcao-tab"
                        data-toggle="tab"
                        href="#percepcao"
                        role="tab"
                        aria-controls="percepcao"
                        aria-selected="true"
                        style={{ fontSize: "14px" }}
                      >
                        Percepção (
                        {this.props.percepcao ? (
                          <small className="text-muted">
                            {this.props.percepcao.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="motricidade-tab"
                        data-toggle="tab"
                        href="#motricidade"
                        role="tab"
                        aria-controls="motricidade"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Motricidade (
                        {this.props.motricidade ? (
                          <small className="text-muted">
                            {this.props.motricidade.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="desenvolvimento_verbal-tab"
                        data-toggle="tab"
                        href="#desenvolvimento_verbal"
                        role="tab"
                        aria-controls="desenvolvimento_verbal"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Desenvolvimento Verbal (
                        {this.props.desenvolvimento_verbal ? (
                          <small className="text-muted">
                            {this.props.desenvolvimento_verbal.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="memoria-tab"
                        data-toggle="tab"
                        href="#memoria"
                        role="tab"
                        aria-controls="memoria"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Memória (
                        {this.props.memoria ? (
                          <small className="text-muted">
                            {this.props.memoria.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="areas_numericas-tab"
                        data-toggle="tab"
                        href="#areas_numericas"
                        role="tab"
                        aria-controls="areas_numericas"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Áreas Numéricas (
                        {this.props.areas_numericas ? (
                          <small className="text-muted">
                            {this.props.areas_numericas.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="emocional_social-tab"
                        data-toggle="tab"
                        href="#emocional_social"
                        role="tab"
                        aria-controls="emocional_social"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Desenvolvimento Emocional-Social (
                        {this.props.emocional_social ? (
                          <small className="text-muted">
                            {this.props.emocional_social.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="avd-tab"
                        data-toggle="tab"
                        href="#avd"
                        role="tab"
                        aria-controls="avd"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        AVD's (
                        {this.props.avd ? (
                          <small className="text-muted">
                            {this.props.avd.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="percepcao"
                      role="tabpanel"
                      aria-labelledby="percepcao-tab"
                    >
                      {percepcao_resources
                        ? percepcao_resources.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}

                      {percepcao_resources ? (
                        percepcao_resources.length > 0 ? null : (
                          <h6 className="mt-4">Sem recursos desta área</h6>
                        )
                      ) : null}

                      {percepcao_resources ? (
                        percepcao_resources_all.length > 3 ? (
                          <button
                            className="btn"
                            style={{
                              border: "1px solid black",
                              backgroundColor: "white",
                              color: "black",
                              marginBottom: "50px"
                            }}
                          >
                            <Link
                              style={{ color: "black" }}
                              to={`/recursos/percepcao`}
                            >
                              Ver todos
                            </Link>
                          </button>
                        ) : null
                      ) : null}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="motricidade"
                      role="tabpanel"
                      aria-labelledby="motricidade-tab"
                    >
                      {motricidade_resources
                        ? motricidade_resources.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}

                      {motricidade_resources ? (
                        motricidade_resources_all.length > 3 ? (
                          <button
                            className="btn"
                            style={{
                              border: "1px solid black",
                              color: "black",
                              backgroundColor: "white",
                              marginBottom: "50px"
                            }}
                          >
                            <Link
                              style={{ color: "black" }}
                              to={`/recursos/motricidade`}
                            >
                              Ver todos
                            </Link>
                          </button>
                        ) : null
                      ) : null}

                      {motricidade_resources ? (
                        motricidade_resources.length > 0 ? null : (
                          <h6 className="mt-4">Sem recursos desta área</h6>
                        )
                      ) : null}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="desenvolvimento_verbal"
                      role="tabpanel"
                      aria-labelledby="desenvolvimento_verbal-tab"
                    >
                      {desenvolvimento_verbal_resources
                        ? desenvolvimento_verbal_resources.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                      {desenvolvimento_verbal_resources ? (
                        desenvolvimento_verbal_resources.length > 0 ? null : (
                          <h6 className="mt-4">Sem recursos desta área</h6>
                        )
                      ) : null}

                      {desenvolvimento_verbal_resources ? (
                        desenvolvimento_verbal_resources_all.length > 3 ? (
                          <button
                            className="btn"
                            style={{
                              border: "1px solid black",
                              backgroundColor: "white",
                              color: "black",
                              marginBottom: "50px"
                            }}
                          >
                            <Link
                              style={{ color: "black" }}
                              to={`/recursos/d.verbal`}
                            >
                              Ver todos
                            </Link>
                          </button>
                        ) : null
                      ) : null}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="memoria"
                      role="tabpanel"
                      aria-labelledby="memoria-tab"
                    >
                      {memoria_resources
                        ? memoria_resources.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}

                      {memoria_resources ? (
                        memoria_resources_all.length > 3 ? (
                          <button
                            className="btn"
                            style={{
                              border: "1px solid black",
                              backgroundColor: "white",
                              color: "black",
                              marginBottom: "50px"
                            }}
                          >
                            <Link
                              style={{ color: "black" }}
                              to={`/recursos/memoria`}
                            >
                              Ver todos
                            </Link>
                          </button>
                        ) : null
                      ) : null}

                      {memoria_resources ? (
                        memoria_resources.length > 0 ? null : (
                          <h6 className="mt-4">Sem recursos desta área</h6>
                        )
                      ) : null}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="areas_numericas"
                      role="tabpanel"
                      aria-labelledby="areas_numericas-tab"
                    >
                      {areas_numericas_resources
                        ? areas_numericas_resources.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}

                      {areas_numericas_resources ? (
                        areas_numericas_resources_all.length > 3 ? (
                          <button
                            className="btn"
                            style={{
                              border: "1px solid black",
                              backgroundColor: "white",
                              color: "black",
                              marginBottom: "50px"
                            }}
                          >
                            <Link
                              style={{ color: "black" }}
                              to={`/recursos/a.numericas`}
                            >
                              Ver todos
                            </Link>
                          </button>
                        ) : null
                      ) : null}
                      {areas_numericas_resources ? (
                        areas_numericas_resources.length > 0 ? null : (
                          <h6 className="mt-4">Sem recursos desta área</h6>
                        )
                      ) : null}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="emocional_social"
                      role="tabpanel"
                      aria-labelledby="emocional_social-tab"
                    >
                      {emocional_social_resources
                        ? emocional_social_resources.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}

                      {emocional_social_resources ? (
                        emocional_social_resources.length > 0 ? null : (
                          <h6 className="mt-4">Sem recursos desta área</h6>
                        )
                      ) : null}

                      {emocional_social_resources ? (
                        emocional_social_resources_all.length > 3 ? (
                          <button
                            className="btn"
                            style={{
                              border: "1px solid black",
                              backgroundColor: "white",
                              color: "black",
                              marginBottom: "50px"
                            }}
                          >
                            <Link
                              style={{ color: "black" }}
                              to={`/recursos/d.emocional-social`}
                            >
                              Ver todos
                            </Link>
                          </button>
                        ) : null
                      ) : null}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="avd"
                      role="tabpanel"
                      aria-labelledby="avd-tab"
                    >
                      {avd_resources
                        ? avd_resources.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                      {avd_resources ? (
                        avd_resources.length > 0 ? null : (
                          <h6 className="mt-4">Sem recursos desta área</h6>
                        )
                      ) : null}

                      {avd_resources ? (
                        avd_resources_all.length > 3 ? (
                          <button
                            className="btn"
                            style={{
                              border: "1px solid black",
                              backgroundColor: "white",
                              color: "black",
                              marginBottom: "50px"
                            }}
                          >
                            <Link
                              style={{ color: "black" }}
                              to={`/recursos/avd`}
                            >
                              Ver todos
                            </Link>
                          </button>
                        ) : null
                      ) : null}
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
  percepcao: state.resource.percepcao,
  motricidade: state.resource.motricidade,
  desenvolvimento_verbal: state.resource.desenvolvimento_verbal,
  memoria: state.resource.memoria,
  areas_numericas: state.resource.areas_numericas,
  emocional_social: state.resource.emocional_social,
  avd: state.resource.avd
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(DashboardResources));
