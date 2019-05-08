import {
  GET_PATIENTS,
  ADD_PATIENT,
  GET_PATIENT,
  UPDATE_PATIENT,
  GET_PATIENT_THERAPISTS,
  ADD_THERAPIST_PATIENT,
  REMOVE_THERAPIST_PATIENT
} from "../actions/types";

const initialState = {
  patients: [],
  patient: {},
  patientTherapists: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload
      };

    case GET_PATIENT_THERAPISTS:
      return {
        ...state,
        patientTherapists: action.payload
      };

    case ADD_THERAPIST_PATIENT:
      return {
        ...state,
        patientTherapists: [...state.patientTherapists, action.payload]
      };

    case REMOVE_THERAPIST_PATIENT:
      let lista = [];

      state.patientTherapists.forEach(element => {
        if (element._id != action.payload) {
          lista.push(element);
        }
      });

      return {
        ...state,
        patientTherapists: lista
      };

    case ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.payload]
      };
    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload
      };

    case UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.id
            ? (patient = action.payload)
            : patient
        )
      };
    default:
      return state;
  }
}
