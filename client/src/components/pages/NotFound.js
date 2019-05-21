import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class NotFound extends Component {
  render() {

    if (this.props.location.pathname == '/') {
      return null
    }
    
    return (
      <div className = "pageNotFound">
      <h1 className="display-4">
        <span className="text-danger">404</span> Página não encontrada
      </h1>
      <p className="lead">A pagina que procura não existe.</p>
    </div>
    )
  }
}

export default connect(null, null)(withRouter(NotFound));