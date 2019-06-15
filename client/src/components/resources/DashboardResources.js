import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getResourceByCategory } from "../../actions/resourceActions";
import Resource from "./Resource";

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

    let percepcao_resources = this.props.percepcao.slice().reverse();
    percepcao_resources = percepcao_resources.slice(0, 3);

    let motricidade_resources = this.props.motricidade.slice().reverse();
    motricidade_resources = motricidade_resources.slice(0, 3);

    let desenvolvimento_verbal_resources = this.props.desenvolvimento_verbal
      .slice()
      .reverse();
    desenvolvimento_verbal_resources = desenvolvimento_verbal_resources.slice(
      0,
      3
    );

    let memoria_resources = this.props.memoria.slice().reverse();
    memoria_resources = memoria_resources.slice(0, 3);

    let areas_numericas_resources = this.props.areas_numericas
      .slice()
      .reverse();
    areas_numericas_resources = areas_numericas_resources.slice(0, 3);

    let emocional_social_resources = this.props.emocional_social
      .slice()
      .reverse();
    emocional_social_resources = emocional_social_resources.slice(0, 3);

    let avd_resources = this.props.avd.slice().reverse();
    avd_resources = avd_resources.slice(0, 3);

    return (
      <div class="resources">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4 text-center">Recursos</h1>
              <p class="lead text-center">Recursos divididos por categoria</p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <h1 class="display-6">Percepção</h1>
              {percepcao_resources
                ? percepcao_resources.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
              <Link to={`/recursos/percepcao`}>Ver todos</Link>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-6">Motricidade</h1>
              {motricidade_resources
                ? motricidade_resources.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
              <Link to={`/recursos/motricidade`}>Ver todos</Link>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-6">Desenvolvimento Verbal</h1>
              {desenvolvimento_verbal_resources
                ? desenvolvimento_verbal_resources.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
              <Link to={`/recursos/d.verbal`}>Ver todos</Link>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-6">Memória</h1>
              {memoria_resources
                ? memoria_resources.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
              <Link to={`/recursos/memoria`}>Ver todos</Link>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-6">Áreas Numéricas</h1>
              {areas_numericas_resources
                ? areas_numericas_resources.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
              <Link to={`/recursos/a.numericas`}>Ver todos</Link>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-6">Desenvolvimento Emocional-Social</h1>
              {emocional_social_resources
                ? emocional_social_resources.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
              <Link to={`/recursos/d.emocional-social`}>Ver todos</Link>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-6">AVD's</h1>
              {avd_resources
                ? avd_resources.map(resource => (
                    <Resource key={resource._id} resource={resource} />
                  ))
                : null}
              <Link to={`/recursos/avd`}>Ver todos</Link>
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
