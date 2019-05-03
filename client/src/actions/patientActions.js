import { GET_PATIENTS, ADD_PATIENT, GET_ERRORS } from "./types";

import axios from "axios";

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
