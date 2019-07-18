import {
  GET_PATIENTS,
  ADD_PATIENT,
  GET_PATIENT,
  UPDATE_PATIENT,
  GET_PATIENT_THERAPISTS,
  ADD_THERAPIST_PATIENT,
  REMOVE_THERAPIST_PATIENT,
  GET_PATIENT_PARENTS,
  ADD_PARENT_PATIENT,
  REMOVE_PARENT_PATIENT,
  GET_ERRORS,
  ADD_MEDICINE,
  GET_MEDICINES,
  REMOVE_MEDICINE,
  GET_MEDICINE,
  UPDATE_MEDICINE,
  ADD_THERAPEUTIC_NOTE,
  GET_THERAPEUTIC_NOTE,
  REMOVE_THERAPEUTIC_NOTE,
  UPDATE_THERAPEUTIC_NOTE,
  PATIENTS_LOADING,
  CLEAR_ERRORS,
  PATIENT_THERAPISTS_LOADING,
  ADD_COMMENT,
  GET_COMMENTS,
  LOADED
} from "./types";

import axios from "axios";

//////////////////////////////////////////////  ERRORS  ////////////////////////////////////////////////////////////////////////
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

//////////////////////////////////////////////  LOADING  ////////////////////////////////////////////////////////////////////////

export const setPatientLoading = () => {
  return {
    type: PATIENTS_LOADING
  };
};

export const setPatientTherapistsLoading = () => {
  return {
    type: PATIENT_THERAPISTS_LOADING
  };
};

//////////////////////////////////////////////  NOTES  ////////////////////////////////////////////////////////////////////////

export const getTherapeuticNote = id => dispatch => {
  axios
    .get(`/api/therapeuticNote/notes/${id}`)
    .then(res => {
      dispatch({
        type: GET_THERAPEUTIC_NOTE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addTherapeuticNote = (
  patient_id,
  newTherapeuticNote,
  history
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  axios
    .post(
      `/api/therapeuticNote/new/${patient_id}`,
      newTherapeuticNote,
      config,
      {
        onUploadProgress: ProgressEvent => {
          dispatch({
            type: LOADED,
            payload: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      }
    )
    .then(res => {
      dispatch({
        type: ADD_THERAPEUTIC_NOTE,
        payload: res.data
      });
      dispatch(clearErrors());
      history.push(`/paciente/ver/${patient_id}`);
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const removeTherapeuticNote = note_id => async dispatch => {
  try {
    const res = await axios.delete(`/api/therapeuticNote/notes/${note_id}`);
    dispatch({
      type: REMOVE_THERAPEUTIC_NOTE,
      payload: res.data._id
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const updateTherapeuticNote = (
  patient_id,
  note_id,
  newTherapeuticNote,
  history
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  axios
    .post(`/api/therapeuticNote/notes/${note_id}`, newTherapeuticNote, config)
    .then(res => {
      dispatch({
        type: UPDATE_THERAPEUTIC_NOTE,
        payload: res.data
      });
      dispatch(clearErrors());
      history.push(`/paciente/ver/${patient_id}`);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getComments = note_id => async dispatch => {
  try {
    const res = await axios.get(`/api/therapeuticNote/${note_id}/feedback`);
    console.log(res.data, "comments");
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });

    dispatch(clearErrors());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const addComment = (note_id, newFeedback) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/therapeuticNote/${note_id}/feedback`,
      newFeedback
    );
    // dispatch({
    //   type: ADD_COMMENT,
    //   payload: res.data
    // });
    dispatch({
      type: GET_THERAPEUTIC_NOTE,
      payload: res.data
    });

    dispatch(clearErrors());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
//////////////////////////////////////////////  MEDICINE  ////////////////////////////////////////////////////////////////////////

export const getMedicine = (patient_id, medicine_id) => dispatch => {
  axios
    .get(`/api/patient-profile/${patient_id}/medicine/${medicine_id}`)
    .then(res => {
      dispatch({
        type: GET_MEDICINE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getPatientMedicine = patient_id => dispatch => {
  axios
    .get(`/api/patient-profile/${patient_id}/medicine/all`)
    .then(res => {
      dispatch({
        type: GET_MEDICINES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addMedicine = (newMedicine, patient_id, history) => dispatch => {
  axios
    .post(`/api/patient-profile/${patient_id}/medicine`, newMedicine)
    .then(res => {
      dispatch({
        type: ADD_MEDICINE,
        payload: res.data.medicine
      });
      dispatch(clearErrors());

      history.push(`/paciente/ver/${patient_id}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateMedicine = (
  patient_id,
  medicine_id,
  newMedicine
) => dispatch => {
  axios
    .post(
      `/api/patient-profile/${patient_id}/medicine/${medicine_id}`,
      newMedicine
    )
    .then(res => {
      dispatch({
        type: UPDATE_MEDICINE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteMedicine = (patient_id, medicine_id) => dispatch => {
  axios
    .delete(`/api/patient-profile/${patient_id}/medicine/${medicine_id}`)
    .then(res => {
      dispatch({
        type: REMOVE_MEDICINE,
        payload: medicine_id
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//////////////////////////////////////////////  PATIENT'S THERAPISTS  ////////////////////////////////////////////////////////////////////////

export const getPatientTherapists = id => async dispatch => {
  const res = await axios.get(`/api/patient-profile/patient/${id}`);
  // dispatch(setPatientTherapistsLoading());

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
        .catch(err => {
          return "errors";
        });
    })
    .catch(err => console.log(err.response.data));
};

export const removeTherapistPatient = (id, therapist_id) => dispatch => {
  console.log("entrei!!");
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

//////////////////////////////////////////////  PATIENT'S PARENTS  ////////////////////////////////////////////////////////////////////////

export const getPatientParents = id => async dispatch => {
  const res = await axios.get(`/api/patient-profile/patient/${id}`);

  dispatch({
    type: GET_PATIENT_PARENTS,
    payload: res.data.parent
  });
};

export const addParentPatient = (parent_name, patient_id) => dispatch => {
  axios
    .get(`/api/users/parent/name/${parent_name}`)
    .then(res => {
      let parent_id = res.data._id;
      axios
        .post(`/api/patient-profile/${patient_id}/parent/${res.data._id}`)
        .then(res => {
          axios.get(`/api/users/parent/${parent_id}`).then(parent => {
            dispatch({
              type: ADD_PARENT_PATIENT,
              payload: parent.data
            });
          });
        })
        .catch(err => {
          return "errors";
        });
    })
    .catch(err => console.log(err.response.data));
};

export const removeParentPatient = (id, parent_id) => dispatch => {
  axios
    .delete(`/api/patient-profile/${id}/parent/${parent_id}`)
    .then(res => {
      dispatch({
        type: REMOVE_PARENT_PATIENT,
        payload: parent_id
      });
    })
    .catch(err => console.log(err));
};

//////////////////////////////////////////////  PATIENT'S   ////////////////////////////////////////////////////////////////////////

export const getPatient = id => dispatch => {
  axios
    .get(`/api/patient-profile/patient/${id}`)
    .then(res => {
      dispatch({
        type: GET_PATIENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getPatients = () => async dispatch => {
  dispatch(setPatientLoading());

  const res = await axios.get("/api/patient-profile/all");

  dispatch({
    type: GET_PATIENTS,
    payload: res.data
  });
};

export const addPatient = (newPatient, history) => async dispatch => {
  try {
    const res = await await axios.post("/api/admin/patient", newPatient);

    dispatch({
      type: ADD_PATIENT,
      payload: res.data
    });
    dispatch(clearErrors());

    history.push("/admin-dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const updatePatient = (patient, history) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/patient-profile/patient/${patient.id}`,
      patient
    );
    dispatch({
      type: UPDATE_PATIENT,
      payload: res.data
    });

    dispatch(clearErrors());

    history.push("/admin-dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
