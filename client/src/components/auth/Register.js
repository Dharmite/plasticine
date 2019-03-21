import React, { Component } from "react";
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    institution: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      institution: this.state.institution
    }

    axios.post('/api/admin/register', newUser)
    .then(res => console.log(res.data))
    .catch(err => this.setState({errors: err.response.data}));
    
  }

  render() {


    const { errors } = this.state;

    // const errors = this.state.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Registo</h1>
              <p className="lead text-center">Registe-se como administrador do seu centro</p>
              <form noValidate onSubmit = {this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg",{
                      'is-invalid': errors.name
                    })}
                    placeholder="Nome"
                    name="name"
                    value = {this.state.name}
                    onChange = {this.onChange}
                  />
                  {errors.name ? (
                    <div class="invalid-feedback">
                      {errors.name}
                    </div>
                  ): null}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg",{
                      'is-invalid': errors.email
                    })}
                    placeholder="Email"
                    name="email"
                    value = {this.state.email}
                    onChange = {this.onChange}
                  />
                  {errors.email ? (
                    <div class="invalid-feedback">
                      {errors.email}
                    </div>
                  ): null}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",{
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value = {this.state.password}
                    onChange = {this.onChange}
                  />
                  {errors.password ? (
                    <div class="invalid-feedback">
                      {errors.password}
                    </div>
                  ): null}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",{
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirme a sua Password"
                    name="password2"
                    value = {this.state.password2}
                    onChange = {this.onChange}
                  />
                  {errors.password2 ? (
                    <div class="invalid-feedback">
                      {errors.password2}
                    </div>
                  ): null}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg",{
                      'is-invalid': errors.institution
                    })}
                    placeholder="Instituição"
                    name="institution"
                    value = {this.state.institution}
                    onChange = {this.onChange}
                  />
                  {errors.institution ? (
                    <div class="invalid-feedback">
                      {errors.institution}
                    </div>
                  ): null}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;