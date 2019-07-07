import React, { Component } from "react";
import NavbarGuest from "./NavbarGuest";

class Landing extends Component {
  componentDidMount(){
    
  }
  render() {
    return (
      <div>
        <NavbarGuest />
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active item1">
              <div className="carousel-caption d-md-block">
                <h2>Registo de dados</h2>
                <p>
                  Com esta aplicação poderá realizar registos terapeuticos e
                  partilhar recursos com todos os terapeutas.
                </p>
              </div>
            </div>

            <div className="carousel-item item2">
              <div className="carousel-caption d-md-block">
                <h2>Canal de comunicação</h2>
                <p>
                  Um canal que permite uma comunicação mais eficaz entre os
                  terapeutas e os pais.
                </p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Landing;
