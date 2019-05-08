import React, { Component } from "react";

class Landing extends Component {
  // componentDidMount() {
  //   if (document.getElementsByClassName("pageNotFound").length == 1) {
  //     document.getElementsByClassName("pageNotFound")[0].remove();
  //   }
  // }

  render() {
    return (
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
                Esta funcionalidade permite que os terapeutas registem os dados.
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
    );
  }
}

export default Landing;
