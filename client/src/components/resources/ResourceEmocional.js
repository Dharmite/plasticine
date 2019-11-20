import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class ResourceEmocional extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("Desenvolvimento Emocional-Social");
  }

  render() {
    let emocional;
    let social;

    if (this.props.emocional_social) {
      emocional = this.props.emocional_social.filter(
        resource => resource.subCategory === "Área Emocional-Afetiva"
      );
    }
    if (this.props.emocional_social) {
      social = this.props.emocional_social.filter(
        resource => resource.subCategory === "Área Social"
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
                      <p class="lead text-center">
                        Desenvolvimento Emocional-Social
                      </p>
                    </div>
                  </div>

                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="emocional-tab"
                        data-toggle="tab"
                        href="#emocional"
                        role="tab"
                        aria-controls="emocional"
                        aria-selected="true"
                        style={{ fontSize: "14px" }}
                      >
                        Área Emocional-Afetiva (
                        {this.props.emocional_social ? (
                          <small className="text-muted">
                            {emocional.length}
                          </small>
                        ) : null}
                        )
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="social-tab"
                        data-toggle="tab"
                        href="#social"
                        role="tab"
                        aria-controls="social"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Área Social (
                        {this.props.emocional_social ? (
                          <small className="text-muted">{social.length}</small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="emocional"
                      role="tabpanel"
                      aria-labelledby="emocional-tab"
                    >
                      {this.props.emocional_social ? (
                        emocional.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.emocional_social
                        ? emocional.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="social"
                      role="tabpanel"
                      aria-labelledby="social-tab"
                    >
                      {this.props.emocional_social ? (
                        social.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.emocional_social
                        ? social.map(resource => (
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
  emocional_social: state.resource.emocional_social
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(ResourceEmocional));
