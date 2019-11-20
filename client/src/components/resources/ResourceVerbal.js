import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

class ResourceVerbal extends Component {
  componentDidMount() {
    this.props.getResourceByCategory("Desenvolvimento Verbal");
  }

  render() {
    let compreensao;
    let raciocinio;
    let consciencia;
    let segmentacao;
    let fluencia;
    let leitura;
    let escrita;

    if (this.props.desenvolvimento_verbal) {
      compreensao = this.props.desenvolvimento_verbal.filter(
        resource => resource.subCategory === "Compreensão Verbal"
      );
    }
    if (this.props.desenvolvimento_verbal) {
      raciocinio = this.props.desenvolvimento_verbal.filter(
        resource => resource.subCategory === "Raciocínio Verbal"
      );
    }

    if (this.props.desenvolvimento_verbal) {
      consciencia = this.props.desenvolvimento_verbal.filter(
        resource => resource.subCategory === "Consciência Fonológica"
      );
    }
    if (this.props.desenvolvimento_verbal) {
      segmentacao = this.props.desenvolvimento_verbal.filter(
        resource => resource.subCategory === "Segmentação Silábica e fonológica"
      );
    }

    if (this.props.desenvolvimento_verbal) {
      fluencia = this.props.desenvolvimento_verbal.filter(
        resource => resource.subCategory === "Fluência Verbal"
      );
    }
    if (this.props.desenvolvimento_verbal) {
      leitura = this.props.desenvolvimento_verbal.filter(
        resource => resource.subCategory === "Leitura"
      );
    }
    if (this.props.desenvolvimento_verbal) {
      escrita = this.props.desenvolvimento_verbal.filter(
        resource => resource.subCategory === "Escrita"
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
                      <p class="lead text-center">Desenvolvimento Verbal</p>
                    </div>
                  </div>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="compreensao-tab"
                        data-toggle="tab"
                        href="#compreensao"
                        role="tab"
                        aria-controls="compreensao"
                        aria-selected="true"
                        style={{ fontSize: "14px" }}
                      >
                        Compreensão Verbal (
                        {this.props.desenvolvimento_verbal ? (
                          <small className="text-muted">
                            {compreensao.length}
                          </small>
                        ) : null}
                        )
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
                        Raciocínio Verbal (
                        {this.props.desenvolvimento_verbal ? (
                          <small className="text-muted">
                            {raciocinio.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="consciencia-tab"
                        data-toggle="tab"
                        href="#consciencia"
                        role="tab"
                        aria-controls="consciencia"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Consciência Fonológica (
                        {this.props.desenvolvimento_verbal ? (
                          <small className="text-muted">
                            {consciencia.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="segmentacao-tab"
                        data-toggle="tab"
                        href="#segmentacao"
                        role="tab"
                        aria-controls="segmentacao"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Segmentação Silábica e fonológica (
                        {this.props.desenvolvimento_verbal ? (
                          <small className="text-muted">
                            {segmentacao.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="fluencia-tab"
                        data-toggle="tab"
                        href="#fluencia"
                        role="tab"
                        aria-controls="fluencia"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Fluência Verbal (
                        {this.props.desenvolvimento_verbal ? (
                          <small className="text-muted">
                            {fluencia.length}
                          </small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="leitura-tab"
                        data-toggle="tab"
                        href="#leitura"
                        role="tab"
                        aria-controls="leitura"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Leitura (
                        {this.props.desenvolvimento_verbal ? (
                          <small className="text-muted">{leitura.length}</small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="escrita-tab"
                        data-toggle="tab"
                        href="#escrita"
                        role="tab"
                        aria-controls="escrita"
                        aria-selected="false"
                        style={{ fontSize: "14px" }}
                      >
                        Escrita (
                        {this.props.desenvolvimento_verbal ? (
                          <small className="text-muted">{escrita.length}</small>
                        ) : null}
                        ){" "}
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="compreensao"
                      role="tabpanel"
                      aria-labelledby="compreensao-tab"
                    >
                      {this.props.desenvolvimento_verbal ? (
                        compreensao.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.desenvolvimento_verbal
                        ? compreensao.map(resource => (
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
                      {this.props.desenvolvimento_verbal ? (
                        raciocinio.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.desenvolvimento_verbal
                        ? raciocinio.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="consciencia"
                      role="tabpanel"
                      aria-labelledby="consciencia-tab"
                    >
                      {this.props.desenvolvimento_verbal ? (
                        consciencia.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.desenvolvimento_verbal
                        ? consciencia.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="segmentacao"
                      role="tabpanel"
                      aria-labelledby="segmentacao-tab"
                    >
                      {this.props.desenvolvimento_verbal ? (
                        segmentacao.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.desenvolvimento_verbal
                        ? segmentacao.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="fluencia"
                      role="tabpanel"
                      aria-labelledby="fluencia-tab"
                    >
                      {this.props.desenvolvimento_verbal ? (
                        fluencia.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.desenvolvimento_verbal
                        ? fluencia.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="leitura"
                      role="tabpanel"
                      aria-labelledby="leitura-tab"
                    >
                      {this.props.desenvolvimento_verbal ? (
                        leitura.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.desenvolvimento_verbal
                        ? leitura.map(resource => (
                            <Resource key={resource._id} resource={resource} />
                          ))
                        : null}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="escrita"
                      role="tabpanel"
                      aria-labelledby="escrita-tab"
                    >
                      {this.props.desenvolvimento_verbal ? (
                        escrita.length > 0 ? null : (
                          <h6 className="mt-3">Sem recursos desta área</h6>
                        )
                      ) : null}
                      {this.props.desenvolvimento_verbal
                        ? escrita.map(resource => (
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

const mapStateToProps = state => ({
  user: state.auth.user,
  desenvolvimento_verbal: state.resource.desenvolvimento_verbal
});

export default connect(
  mapStateToProps,
  { getResourceByCategory }
)(withRouter(ResourceVerbal));
