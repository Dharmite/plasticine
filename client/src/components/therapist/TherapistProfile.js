import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTherapist } from "../../actions/therapistActions";
import { getUserPatients } from "../../actions/authActions";
import Resource from "../resources/Resource";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import doctor_pic from "../../img/doctor.png";
import user_pic from "../../img/user.png";
import kid_pic from "../../img/kid.png";
import Patient from "../patient/Patient";

class TherapistProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTherapist(id);

    if(this.props.user.userType == "therapist"){
      this.props.getUserPatients(this.props.user.id);
    }

  }

  diff = (arr1, arr2) => {

    var ret = [];
    arr1.sort();
    arr2.sort();
    for(var i = 0; i < arr1.length; i += 1) {
      console.log(arr1[i]._id, "ELEM");
        if(arr2.findIndex(elem => {
          console.log(elem._id, "elem._id");
          console.log(arr1[i]._id, "arr1[i]._id");
          return elem._id == arr1[i]._id
        
        }) > -1){
            ret.push(arr1[i]);
        }
    }
    return ret;

  }

  

  render() {
    const {
      _id,
      name,
      email,
      specialty,
      resources,
      patient,
      account_status
    } = this.props.therapist;

    let userType;

    if (this.props.user.userType === "admin") {
      userType = "admin";
    } else if (this.props.user.userType === "therapist") {
      userType = "terapeuta";
    } else {
      userType = "parente";
    }

    let common_patients;
    let patient_ids = [];

    

    if(patient && this.props.auth.patients){

      // patient.forEach(element => {

      //   patient_ids.push(element._id);
        
      // });

      // console.log(patient_ids);

      common_patients = this.diff(patient,this.props.auth.patients);


    }

    console.log(common_patients, "common patients");

    


    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <Sidebar />
              <div className="row">
                <div className="col-6 mt-3 mb-3">
                  <Link
                    to={`/${userType}-dashboard`}
                    className="btn"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "white"
                    }}
                  >
                    Voltar
                  </Link>{" "}
                </div>
              </div>

              <section className="content">
                <div className="container-fluid">
                  {account_status ? (
                    account_status == "active" ? (
                      <div
                        className="card card-body mb-3"
                        style={{ backgroundColor: "#FFE4B5" }}
                      >
                        <div className="row">
                          <div className="col-lg-2 col-md-2">
                            <img
                              className="img-circle elevation-1"
                              src={doctor_pic}
                              alt="User Avatar"
                            />
                          </div>
                          <div className="col-lg-4 col-md-4 border-right pl-0">
                            {name ? <h3>{name}</h3> : null}
                            {email ? (
                              <p>
                                <i className="fas fa-envelope-square" /> {email}
                              </p>
                            ) : null}
                            {specialty ? <p>{specialty}</p> : null}
                            {this.props.user.userType == "admin" ? (
                              <Link
                                to={`/terapeuta/editar/${_id}`}
                                className="btn bg-white"
                                style={{
                                  border: "1px solid"
                                }}
                              >
                                Editar
                              </Link>
                            ) : null}
                          </div>

                          {/* <div className="col-lg-4 col-md-4 pl-4">
                            {resources ? (
                              <h5>Recursos criados: {resources.length}</h5>
                            ) : null}

                            {patient ? (
                              <h5>Crianças: {patient.length} </h5>
                            ) : null}
                          </div> */}
                        </div>
                      </div>
                    ) : (
                      <div className="card card-body bg-secondary text-white mb-3">
                        <div className="row">
                          <div className="col-lg-2 col-md-2">
                            <img
                              className="img-circle elevation-1"
                              src={doctor_pic}
                              alt="User Avatar"
                            />
                          </div>
                          <div className="col-lg-4 col-md-4 border-right pl-0">
                            {name ? <h3>{name}</h3> : null}
                            {email ? (
                              <p>
                                <i className="fas fa-envelope-square" /> {email}
                              </p>
                            ) : null}
                            {specialty ? <p>{specialty}</p> : null}
                            {this.props.user.userType == "admin" ? (
                              <Link
                                to={`/terapeuta/editar/${_id}`}
                                className="btn bg-white"
                                style={{
                                  border: "1px solid"
                                }}
                              >
                                <span style={{ color: "black" }}>Editar</span>
                              </Link>
                            ) : null}
                          </div>

                          {/* <div className="col-lg-4 col-md-4 pl-4">
                            {resources ? (
                              <h5>
                                Numero de recursos criados: {resources.length}
                              </h5>
                            ) : null}

                            {patient ? (
                              <h5>
                                Numero de crianças tratadas: {patient.length}{" "}
                              </h5>
                            ) : null}
                          </div> */}
                        </div>
                      </div>
                    )
                  ) : null}

                  {this.props.user ? (
                    this.props.user.userType == "admin" ? (
                      <div className="row">
                        {/* <div class="col-md-8">
                          <h2>Recursos</h2>
                          {resources ? (
                            resources.length > 0 ? (
                              resources.map(resource => (
                                <Resource
                                  key={resource._id}
                                  resource={resource}
                                />
                              ))
                            ) : (
                              <h3 className="text-center">
                                Sem recursos para mostrar
                              </h3>
                            )
                          ) : null}
                        </div> */}
                        <div className="col-md-12">
                          <h3 className="card-title">Crianças</h3>

                          {/* /.card-header */}
                          <ul className="products-list product-list-in-card">
                            {patient ? (
                              patient.length > 0 ? (
                                patient.map(user => (
                                  <Patient key={user.id} patient={user} />
                                  // <li class="item">
                                  //   <div className="product-img">
                                  //     <img
                                  //       className="img-circle elevation-2"
                                  //       src={kid_pic}
                                  //       alt="User Avatar"
                                  //     />
                                  //   </div>
                                  //   <div className="product-info">
                                  //     <Link
                                  //       style={{ color: "black" }}
                                  //       to={`/paciente/ver/${user._id}`}
                                  //     >
                                  //       {user.name}
                                  //     </Link>
                                  //   </div>
                                  // </li>
                                ))
                              ) : (
                                <p className="mt-4"> Sem familiares associados </p>
                              )
                            ) : null}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div class="row">
                        <div class="col-md-8">
                          <h2>Recursos</h2>
                          {resources ? (
                            resources.length > 0 ? (
                              resources.map(resource => (
                                <Resource
                                  key={resource._id}
                                  resource={resource}
                                />
                              ))
                            ) : (
                              <h3 className="text-center">
                                Sem recursos para mostrar
                              </h3>
                            )
                          ) : null}
                        </div>
                        <div class="col-md-4">
                          <h2>Utentes em comum</h2>

                          <div class="card">
                            <div className="card-body p-0">
                              <ul className="products-list product-list-in-card pl-2 pr-2">
                                {common_patients ? (
                                  common_patients.length > 0 ? (
                                    common_patients.map(user => (
                                      <li class="item">
                                        <div className="product-img">
                                          <img
                                            className="img-circle elevation-2"
                                            src={kid_pic}
                                            alt="User Avatar"
                                          />
                                        </div>
                                        <div className="product-info">
                                          <Link
                                            style={{ color: "black" }}
                                            to={`/paciente/ver/${user._id}`}
                                          >
                                            {user.name}
                                          </Link>
                                        </div>
                                      </li>
                                    ))
                                  ) : (
                                    <p> Sem familiares associados </p>
                                  )
                                ) : null}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ) : null}
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

TherapistProfile.propTypes = {
  therapist: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  auth: state.auth,
  therapist: state.therapist.therapist
});

export default connect(
  mapStateToProps,
  { getTherapist, getUserPatients }
)(TherapistProfile);
