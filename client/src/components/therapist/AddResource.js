import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addResource } from "../../actions/resourceActions";
import $ from "jquery";

import "./AddResource.css";

class AddResource extends Component {
  state = {
    title: "",
    category: "",
    subCategory: "",
    observation: "",
    files: "",
    filename: "Escolha um ficheiro",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, observation, category, subCategory, files } = this.state;

    let formData = new FormData();
    formData.append("title", title);
    formData.append("observation", observation);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    for (var x = 0; x < this.state.files.length; x++) {
      formData.append("files", this.state.files[x]);
    }

    const newResource = {
      title,
      observation,
      category,
      subCategory,
      files
    };

    this.props.addResource(formData);

    this.setState({
      title: "",
      category: "",
      subCategory: "",
      observation: "",
      files: "",
      filename: "Escolha um ficheiro",
      errors: {}
    });

    this.props.history.push("/terapeuta-dashboard");
  };

  handleSubCategorySelectionChanged = e => {

    this.setState({
      subCategory: e.target.innerHTML
    }, () => {

      if(this.state.subCategory == "Esquema Corporal" || this.state.subCategory == "Coordenação óculo-manual" || this.state.subCategory == "Coordenação grafo-manual (pré-escrita)" || this.state.subCategory == "Precisão Manual"){
        this.setState({category: "Motricidade"})
      }

      else if(this.state.subCategory == "Visual" || this.state.subCategory == "Auditiva" || this.state.subCategory == "Espacial" || this.state.subCategory == "Contrastes" || this.state.subCategory == "Temporal"){
        this.setState({category: "Percepção"})
      }

      else if(this.state.subCategory == "Compreensão Verbal" || this.state.subCategory == "Raciocínio Verbal" || this.state.subCategory == "Consciência Fonológica" || this.state.subCategory == "Segmentação Silábica e fonológica" || this.state.subCategory == "Fluência Verbal" || this.state.subCategory == "Leitura" || this.state.subCategory == "Escrita"){
        this.setState({category: "Desenvolvimento Verbal"})
      }

      else if(this.state.subCategory == "Auditiva" || this.state.subCategory == "Visual" || this.state.subCategory == "Verbal e Numérica Repetitiva" || this.state.subCategory == "Verbal e Numérica Significativa"){
        this.setState({category: "Memória"})
      }

      else if(this.state.subCategory == "Conceitos Numéricos Básicos" || this.state.subCategory == "Cálculo" || this.state.subCategory == "Raciocínio Abstrato"){
        this.setState({category: "Áreas Numéricas"})
      }

      else if(this.state.subCategory == "Área Emocional-Afetiva" || this.state.subCategory == "Área Social"){
        this.setState({category: "Desenvolvimento Emocional-Social"})
      }

      else if(this.state.subCategory == "Autonomia" || this.state.subCategory == "Escola" || this.state.subCategory == "Supermercado" || this.state.subCategory=="Cabeleireiro" || this.state.subCategory == "Centro Comercial" || this.state.subCategory == "Parque Infantil" || this.state.subCategory == "Livraria" || this.state.subCategory == "Loja de Roupa" || this.state.subCategory == "Hospital / Centro Médico"){
        this.setState({category: "AVD's"})
      }

    });



  };
  onChange = e => {
    if (e.target.name == "files") {
      this.setState({ files: e.target.files });
      this.setState({ filename: e.target.files[0].name });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  componentDidMount() {
    $(function() {
      $(".dropdown-menu li a").click(function() {
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
      });
    });
  }

  render() {
    const {
      title,
      observation,
      category,
      subCategory,
      files,
      filename,
      errors
    } = this.state;

    return (
      <div className="card mb-3 mt-4">
        <div className="card-header">Adicionar recurso</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit} encType="multipart/form-data">
            <TextInputGroup
              label="Titulo"
              name="title"
              placeholder="Introduza um titulo"
              value={title}
              onChange={this.onChange}
              error={errors.title}
            />
            <TextInputGroup
              label="Observação"
              name="observation"
              type="text"
              placeholder="Introduza uma observação"
              value={observation}
              onChange={this.onChange}
              error={errors.observation}
            />
            <div className="form-group">
              <label>Escolha uma categoria</label>
              <div class="dropdown">
                <button
                  class="btn btn-info dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  name="subCategory"
                >
                  Escolha uma categoria
                </button>
                <ul
                  class="dropdown-menu multi-level"
                  role="menu"
                  aria-labelledby="dropdownMenu"
                >
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" tabindex="-1" href="#">
                      Percepção
                    </a>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Visual
                        </a>
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Auditiva
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Espacial
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Contrastes
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Temporal
                        </a>{" "}
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-divider" />
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" tabindex="-1" href="#">
                      Motricidade
                    </a>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Esquema Corporal
                        </a>
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Coordenação óculo-manual
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Coordenação grafo-manual (pré-escrita)
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Precisão Manual
                        </a>{" "}
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-divider" />
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" tabindex="-1" href="#">
                      Desenvolvimento Verbal
                    </a>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Compreensão Verbal
                        </a>
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Raciocínio Verbal
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Consciência Fonológica
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Segmentação Silábica e fonológica
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}> 
                          Fluência Verbal
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Leitura
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Escrita
                        </a>{" "}
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-divider" />
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" tabindex="-1" href="#">
                      Memória
                    </a>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Auditiva
                        </a>
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Visual
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Verbal e Numérica Repetitiva
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Verbal e Numérica Significativa
                        </a>{" "}
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-divider" />
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" tabindex="-1" href="#">
                      Áreas Numéricas
                    </a>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Conceitos Numéricos Básicos
                        </a>
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Cálculo
                        </a>{" "}
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Raciocínio Abstrato
                        </a>{" "}
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-divider" />
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" tabindex="-1" href="#">
                      Desenvolvimento Emocional-Social
                    </a>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Área Emocional-Afetiva
                        </a>
                      </li>
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Área Social
                        </a>{" "}
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-divider" />
                  <li class="dropdown-submenu">
                    <a class="dropdown-item" tabindex="-1" href="#">
                      AVD's
                    </a>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                          Autonomia
                        </a>
                      </li>
                      <li class="dropdown-submenu">
                        <a class="dropdown-item" tabindex="-1" href="#">
                          Rotinas
                        </a>{" "}
                        <ul class="dropdown-menu">
                          <li class="dropdown-item">
                            <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                              Escola
                            </a>
                          </li>
                          <li class="dropdown-item">
                            <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                              Supermercado
                            </a>{" "}
                          </li>
                          <li class="dropdown-item">
                            <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                              Cabeleireiro
                            </a>{" "}
                          </li>
                          <li class="dropdown-item">
                            <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                              Centro Comercial
                            </a>{" "}
                          </li>
                          <li class="dropdown-item">
                            <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                              Parque Infantil
                            </a>{" "}
                          </li>
                          <li class="dropdown-item">
                            <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                              Livraria
                            </a>{" "}
                          </li>
                          <li class="dropdown-item">
                            <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                              Loja de Roupa
                            </a>{" "}
                          </li>
                          <li class="dropdown-item">
                            <a class="dropdown-item" tabindex="-1" href="#" onClick={this.handleSubCategorySelectionChanged}>
                              Hospital / Centro Médico
                            </a>{" "}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="custom-file mb-4 mt-2">
              <input
                type="file"
                name="files"
                className="custom-file-input"
                id="customFile"
                placeholder="Faça upload dos ficheiros"
                onChange={this.onChange}
                error={errors.files}
                multiple
              />
              <label className="custom-file-label" htmlFor="customFile">
                {" "}
                {filename}
              </label>
            </div>

            <input
              type="submit"
              value="Adicionar recurso"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddResource.propTypes = {
  addResource: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addResource }
)(withRouter(AddResource));