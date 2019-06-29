// import React, { Component } from "react";
// import TextInputGroup from "../common/TextInputGroup";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { withRouter, Link } from "react-router-dom";
// import { getPatient, addTherapeuticNote } from "../../actions/patientActions";
// import $ from "jquery";
// import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

// class AddTherapeuticNote extends Component {
//   componentWillUnmount() {
//     if ($(".modal-backdrop")[0]) {
//       document.getElementsByClassName("modal-backdrop")[0].remove();
//       document.body.classList.remove("modal-open");
//       document.body.style = "";
//     }
//   }
//   state = {
//     title: "",
//     observation: "",
//     activity: "",
//     behavior: "",
//     availableTo2: "",
//     files: "",
//     filename: "Escolha um ficheiro",
//     errors: {}
//   };

//   onSubmit = e => {
//     e.preventDefault();

//     const {
//       title,
//       observation,
//       activity,
//       behavior,
//       files,
//       availableTo2
//     } = this.state;

//     let availableTo = "";

//     if (availableTo2 !== "") {
//       availableTo2.forEach(element => {
//         availableTo += element + ",";
//       });

//       availableTo = availableTo.replace(/,/g, " ");

//       availableTo = availableTo.replace(/\s+$/, "");

//       let formData = new FormData();
//       formData.append("title", title);
//       formData.append("observation", observation);
//       formData.append("activity", activity);
//       formData.append("behavior", behavior);
//       formData.append("availableTo", availableTo);
//       for (var x = 0; x < this.state.files.length; x++) {
//         formData.append("files", this.state.files[x]);
//       }

//       const { id } = this.props.match.params;
//       this.props.addTherapeuticNote(id, formData);

//       this.setState({
//         title: "",
//         observation: "",
//         activity: "",
//         behavior: "",
//         files: "",
//         availableTo2: "",
//         errors: {}
//       });

//       this.props.history.push("/terapeuta-dashboard");
//     } else {
//       let formData = new FormData();
//       formData.append("title", title);
//       formData.append("observation", observation);
//       formData.append("activity", activity);
//       formData.append("behavior", behavior);
//       formData.append("availableTo", availableTo2);
//       for (var x = 0; x < this.state.files.length; x++) {
//         formData.append("files", this.state.files[x]);
//       }

//       const { id } = this.props.match.params;
//       this.props.addTherapeuticNote(id, formData, this.props.history);

//       this.setState({
//         title: "",
//         observation: "",
//         activity: "",
//         behavior: "",
//         files: "",
//         availableTo2: "",
//         errors: {}
//       });
//     }
//   };

//   handleSelectionChanged = e => {
//     let availableTo2 = [];
//     let inputElements = document.getElementsByClassName("form-check-input");
//     for (var i = 0; inputElements[i]; ++i) {
//       if (inputElements[i].checked) {
//         availableTo2.push(inputElements[i].value);
//       }
//     }
//     this.setState({
//       availableTo2: availableTo2
//     });
//   };

//   componentWillMount() {
//     const { id } = this.props.match.params;
//     this.props.getPatient(id);
//   }

//   onChange = e => {
//     if (e.target.name == "files") {
//       this.setState({ files: e.target.files });
//       this.setState({ filename: e.target.files[0].name });
//     } else {
//       this.setState({ [e.target.name]: e.target.value });
//     }
//   };

//   render() {
//     const {
//       title,
//       observation,
//       activity,
//       behavior,
//       errors,
//       availableTo2,
//       files,
//       filename
//     } = this.state;

//     let { therapist, parent } = this.props.patient;

//     return (
//       <div>
//         <button
//           type="button"
//           class="btn btn-light mt-3"
//           data-toggle="modal"
//           data-target="#backModal"
//         >
//           Voltar
//         </button>
//         <div
//           class="modal fade"
//           id="backModal"
//           tabIndex="-1"
//           role="dialog"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <h5 class="modal-title" id="exampleModalLabel">
//                   Atenção!
//                 </h5>
//                 <button
//                   type="button"
//                   class="close"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div class="modal-body">
//                 Deseja voltar à pagina anterior? As alterações não serão
//                 guardadas
//               </div>
//               <div class="modal-footer">
//                 <button
//                   type="button"
//                   class="btn btn-secondary"
//                   data-dismiss="modal"
//                 >
//                   Cancelar
//                 </button>
//                 <Link to="/terapeuta-dashboard" className="btn btn-light">
//                   Voltar
//                 </Link>{" "}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="card mb-3 mt-4">
//           <div className="card-header">Adicionar registo terapêutico</div>
//           <div className="card-body">
//             <form onSubmit={this.onSubmit} encType="multipart/form-data">
//               <TextInputGroup
//                 label="Titulo"
//                 name="title"
//                 placeholder="Introduza um titulo"
//                 value={title}
//                 onChange={this.onChange}
//                 error={errors.title}
//               />
//               <TextAreaFieldGroup
//                 label="Observação"
//                 name="observation"
//                 placeholder="Introduza uma observação"
//                 value={observation}
//                 onChange={this.onChange}
//                 error={errors.observation}
//               />
//               <TextAreaFieldGroup
//                 label="Atividade realizada"
//                 name="activity"
//                 placeholder="Introduza o nome da atividade"
//                 value={activity}
//                 onChange={this.onChange}
//                 error={errors.activity}
//               />

//               <TextAreaFieldGroup
//                 label="Comportamento demonstrado"
//                 name="behavior"
//                 placeholder="Descreva o comportamento demostrado"
//                 value={behavior}
//                 onChange={this.onChange}
//                 error={errors.behavior}
//               />

//               <div className="form-group">
//                 {therapist || parent ? (
//                   therapist.length > 1 || parent.length > 0 ? (
//                     <label>Disponível para:</label>
//                   ) : null
//                 ) : null}
//                 {therapist
//                   ? therapist.map(elem =>
//                       elem._id !== this.props.auth.user.id ? (
//                         <div class="form-check mb-1">
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             name="availableTo2"
//                             id="defaultCheck1"
//                             value={elem._id}
//                             onChange={this.handleSelectionChanged}
//                             error={errors.availableTo2}
//                           />
//                           <label class="form-check-label" for="defaultCheck1">
//                             {elem.name}
//                           </label>
//                         </div>
//                       ) : null
//                     )
//                   : null}

//                 {parent
//                   ? parent.map(elem =>
//                       elem._id !== this.props.auth.user.id ? (
//                         <div class="form-check mb-1">
//                           <input
//                             class="form-check-input"
//                             type="checkbox"
//                             name="availableTo2"
//                             id="defaultCheck1"
//                             value={elem._id}
//                             onChange={this.handleSelectionChanged}
//                             error={errors.availableTo2}
//                           />
//                           <label class="form-check-label" for="defaultCheck1">
//                             {elem.name}
//                           </label>
//                         </div>
//                       ) : null
//                     )
//                   : null}
//               </div>

//               {/* <TextInputGroup
//               label="Ficheiros"
//               name="files"
//               type="file"
//               placeholder="Faça upload dos ficheiros"
//               value={files}
//               onChange={this.onChange}
//               error={errors.files}
//             /> */}

//               <div className="custom-file mb-4">
//                 <input
//                   type="file"
//                   name="files"
//                   className="custom-file-input"
//                   id="customFile"
//                   placeholder="Faça upload dos ficheiros"
//                   onChange={this.onChange}
//                   error={errors.files}
//                   multiple
//                 />
//                 <label className="custom-file-label" htmlFor="customFile">
//                   {" "}
//                   {filename}
//                 </label>
//               </div>

//               <input
//                 type="submit"
//                 value="Adicionar registo"
//                 className="btn btn-info btn-block mt-4"
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// AddTherapeuticNote.propTypes = {
//   addTherapeuticNote: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   patient: state.patient.patient,
//   patientTherapists: state.patient.patientTherapists,
//   patientParents: state.patient.patientParents,
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { getPatient, addTherapeuticNote }
// )(withRouter(AddTherapeuticNote));