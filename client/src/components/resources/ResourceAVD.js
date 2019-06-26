import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";

class ResourceAVD extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("AVD's");
  }

  render() {
    let autonomia;
    let escola;
    let supermercado;
    let cabeleireiro;
    let centro_comercial;
    let parque_infantil;
    let livraria;
    let roupa;
    let hospital_centro;

    if (this.props.avd) {
      autonomia = this.props.avd.filter(
        resource => resource.subCategory == "Autonomia"
      );
    }
    if (this.props.avd) {
      escola = this.props.avd.filter(
        resource => resource.subCategory == "Escola"
      );
    }
    if (this.props.avd) {
      supermercado = this.props.avd.filter(
        resource => resource.subCategory == "Supermercado"
      );
    }

    if (this.props.avd) {
      cabeleireiro = this.props.avd.filter(
        resource => resource.subCategory == "Cabeleireiro"
      );
    }
    if (this.props.avd) {
      centro_comercial = this.props.avd.filter(
        resource => resource.subCategory == "Centro Comercial"
      );
    }
    if (this.props.avd) {
      parque_infantil = this.props.avd.filter(
        resource => resource.subCategory == "Parque Infantil"
      );
    }

    if (this.props.avd) {
      livraria = this.props.avd.filter(
        resource => resource.subCategory == "Livraria"
      );
    }
    if (this.props.avd) {
      roupa = this.props.avd.filter(
        resource => resource.subCategory == "Loja de Roupa"
      );
    }
    if (this.props.avd) {
      hospital_centro = this.props.avd.filter(
        resource => resource.subCategory == "Hospital / Centro Médico"
      );
    }

    return (
      <div class="resources">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4 text-center">Recursos</h1>
              <p class="lead text-center">AVD's</p>
            </div>
          </div>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="autonomia-tab"
                data-toggle="tab"
                href="#autonomia"
                role="tab"
                aria-controls="autonomia"
                aria-selected="true"
                style={{ fontSize: "14px" }}
              >
                Autonomia (
                {this.props.avd ? (
                  <small className="text-muted">{autonomia.length}</small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="escola-tab"
                data-toggle="tab"
                href="#escola"
                role="tab"
                aria-controls="escola"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Escola (
                {this.props.avd ? (
                  <small className="text-muted">{escola.length}</small>
                ) : null}
                ){" "}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="supermercado-tab"
                data-toggle="tab"
                href="#supermercado"
                role="tab"
                aria-controls="supermercado"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Supermercado (
                {this.props.avd ? (
                  <small className="text-muted">{supermercado.length}</small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="cabeleireiro-tab"
                data-toggle="tab"
                href="#cabeleireiro"
                role="tab"
                aria-controls="cabeleireiro"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Cabeleireiro (
                {this.props.avd ? (
                  <small className="text-muted">{cabeleireiro.length}</small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="centro_comercial-tab"
                data-toggle="tab"
                href="#centro_comercial"
                role="tab"
                aria-controls="centro_comercial"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Centro Comercial (
                {this.props.avd ? (
                  <small className="text-muted">
                    {centro_comercial.length}
                  </small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="parque_infantil-tab"
                data-toggle="tab"
                href="#parque_infantil"
                role="tab"
                aria-controls="parque_infantil"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Parque Infantil (
                {this.props.avd ? (
                  <small className="text-muted">{parque_infantil.length}</small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="livraria-tab"
                data-toggle="tab"
                href="#livraria"
                role="tab"
                aria-controls="livraria"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Livraria (
                {this.props.avd ? (
                  <small className="text-muted">{livraria.length}</small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="roupa-tab"
                data-toggle="tab"
                href="#roupa"
                role="tab"
                aria-controls="roupa"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Loja de Roupa (
                {this.props.avd ? (
                  <small className="text-muted">{roupa.length}</small>
                ) : null}
                )
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="hospital_centro-tab"
                data-toggle="tab"
                href="#hospital_centro"
                role="tab"
                aria-controls="hospital_centro"
                aria-selected="false"
                style={{ fontSize: "14px" }}
              >
                Hospital / Centro Médico (
                {this.props.avd ? (
                  <small className="text-muted">{hospital_centro.length}</small>
                ) : null}
                )
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="autonomia"
              role="tabpanel"
              aria-labelledby="autonomia-tab"
            >
              {this.props.avd ? (
                autonomia.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}
              {this.props.avd
                ? autonomia.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>

            <div
              class="tab-pane fade"
              id="supermercado"
              role="tabpanel"
              aria-labelledby="supermercado-tab"
            >
              {this.props.avd ? (
                supermercado.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}
              {this.props.avd
                ? supermercado.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
            <div
              class="tab-pane fade"
              id="escola"
              role="tabpanel"
              aria-labelledby="escola-tab"
            >
              {this.props.avd ? (
                escola.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.avd
                ? escola.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
            <div
              class="tab-pane fade"
              id="cabeleireiro"
              role="tabpanel"
              aria-labelledby="cabeleireiro-tab"
            >
              {this.props.avd ? (
                cabeleireiro.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.avd
                ? cabeleireiro.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
            <div
              class="tab-pane fade"
              id="centro_comercial"
              role="tabpanel"
              aria-labelledby="centro_comercial-tab"
            >
              {this.props.avd ? (
                centro_comercial.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.avd
                ? centro_comercial.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
            <div
              class="tab-pane fade"
              id="parque_infantil"
              role="tabpanel"
              aria-labelledby="parque_infantil-tab"
            >
              {this.props.avd ? (
                parque_infantil.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.avd
                ? parque_infantil.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>

            <div
              class="tab-pane fade"
              id="livraria"
              role="tabpanel"
              aria-labelledby="livraria-tab"
            >
              {this.props.avd ? (
                livraria.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.avd
                ? livraria.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>

            <div
              class="tab-pane fade"
              id="roupa"
              role="tabpanel"
              aria-labelledby="roupa-tab"
            >
              {this.props.avd ? (
                roupa.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.avd
                ? roupa.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
            </div>
            <div
              class="tab-pane fade"
              id="hospital_centro"
              role="tabpanel"
              aria-labelledby="hospital_centro-tab"
            >
              {this.props.avd ? (
                hospital_centro.length > 0 ? null : (
                  <h6 className="mt-3">Sem recursos desta área</h6>
                )
              ) : null}{" "}
              {this.props.avd
                ? hospital_centro.map(resource => (
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
  avd: state.resource.avd
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(ResourceAVD));
