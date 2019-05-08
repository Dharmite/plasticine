import {
  GET_PATIENTS,
  ADD_PATIENT,
  GET_PATIENT,
  UPDATE_PATIENT,
  GET_PATIENT_THERAPISTS,
  ADD_THERAPIST_PATIENT,
  REMOVE_THERAPIST_PATIENT
} from "./types";

import axios from "axios";

export const getPatientTherapists = id => async dispatch => {
  const res = await axios.get(`/api/patient-profile/patient/${id}`);

  dispatch({
    type: GET_PATIENT_THERAPISTS,
    payload: res.data.therapist
  });
};

export const addTherapistPatient = (therapist_name, patient_id) => dispatch => {
  axios
    .get(`/api/users/therapist/name/${therapist_name}`)
    .then(res => {
      let therapist_id = res.data._id;
      axios
        .post(`/api/patient-profile/${patient_id}/therapist/${res.data._id}`)
        .then(res => {
          axios.get(`/api/users/therapist/${therapist_id}`).then(therapist => {
            dispatch({
              type: ADD_THERAPIST_PATIENT,
              payload: therapist.data
            });
          });
        })
        .catch(err => this.setState({ errors: err.response.data }));
    })
    .catch(err => console.log(err.response.data));
};

export const removeTherapistPatient = (id, therapist_id) => dispatch => {
  axios
    .delete(`/api/patient-profile/${id}/therapist/${therapist_id}`)
    .then(res => {
      dispatch({
        type: REMOVE_THERAPIST_PATIENT,
        payload: therapist_id
      });
    })
    .catch(err => console.log(err));
};

export const getPatients = () => async dispatch => {
  const res = await axios.get("/api/patient-profile/all");

  dispatch({
    type: GET_PATIENTS,
    payload: res.data
  });
};

export const addPatient = newPatient => async dispatch => {
  const res = await await axios.post("/api/admin/patient", newPatient);

  dispatch({
    type: ADD_PATIENT,
    payload: res.data
  });
};

export const getPatient = id => async dispatch => {
  const res = await axios.get(`/api/patient-profile/patient/${id}`);
  dispatch({
    type: GET_PATIENT,
    payload: res.data
  });
};

export const updatePatient = patient => async dispatch => {
  const res = await axios.post(
    `/api/patient-profile/patient/${patient.id}`,
    patient
  );
  dispatch({
    type: UPDATE_PATIENT,
    payload: res.data
  });
};
