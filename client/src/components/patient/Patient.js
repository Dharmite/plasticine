import React, { Component } from "react";

class Patient extends Component {
  render() {
    const { name, age, therapist } = this.props.patient;

    return (
      <div class="card card-body bg-light mb-3">
        <div class="row">
          <div class="col-2">
            <img
              class="rounded-circle"
              style={{ width: "100%" }}
              src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
              alt=""
            />
          </div>
          <div class="col-lg-6 col-md-12 col-12">
            <h3>{name}</h3>
            <p>Idade: {age}</p>
            

            <div className="row">
              <div className="col-4">
                <a
                  href="profile.html"
                  class="btn btn-info"
                  style={{ width: "100%" }}
                >
                  Ver
                </a>
              </div>

              <div className="col-4">
                <a
                  href="profile.html"
                  class="btn btn-info"
                  style={{ width: "100%" }}
                >
                  Editar
                </a>
              </div>
              <div className="col-4">
                <a
                  href="profile.html"
                  class="btn btn-info"
                  style={{ width: "100%" }}
                >
                  Apagar
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-4 d-lg-block">
            <h4>Terapeutas</h4>
            <ul class="list-group">
              {therapist.map(user => (
                <li class="list-group-item">
                  <i class="fa fa-check pr-1" />
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Patient;