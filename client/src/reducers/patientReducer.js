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
  ADD_MEDICINE,
  GET_MEDICINES,
  REMOVE_MEDICINE,
  GET_MEDICINE,
  UPDATE_MEDICINE
} from "../actions/types";

const initialState = {
  patients: [],
  patient: {},
  patientTherapists: [],
  patientParents: [],
  medicines: [],
  medicine: {},
  notes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload
      };
    case GET_MEDICINES:
      return {
        ...state,
        medicines: action.payload
      };

    case GET_MEDICINE:
      return {
        ...state,
        medicine: action.payload
      };

    case REMOVE_MEDICINE:
      return {
        ...state,
        medicines: state.medicines.filter(
          medicine => medicine._id !== action.payload
        )
      };

      case UPDATE_MEDICINE:
      return {
        ...state,
        medicines: state.medicines.map( medicine =>
          medicine._id !== action.payload.id ? (medicine = action.payload) : medicine
        )
      };
    case GET_PATIENT_THERAPISTS:
      return {
        ...state,
        patientTherapists: action.payload
      };

    case GET_PATIENT_PARENTS:
      return {
        ...state,
        patientParents: action.payload
      };

    case ADD_MEDICINE:
      return {
        ...state,
        medicines: action.payload
      };

    case ADD_THERAPIST_PATIENT:
      return {
        ...state,
        patientTherapists: [...state.patientTherapists, action.payload]
      };

    case ADD_PARENT_PATIENT:
      return {
        ...state,
        patientParents: [...state.patientParents, action.payload]
      };

    case REMOVE_THERAPIST_PATIENT:
      let list_therapists = [];

      state.patientTherapists.forEach(element => {
        if (element._id !== action.payload) {
          list_therapists.push(element);
        }
      });

      return {
        ...state,
        patientTherapists: list_therapists
      };

    case REMOVE_PARENT_PATIENT:
      let list_parents = [];

      state.patientParents.forEach(element => {
        if (element._id !== action.payload) {
          list_parents.push(element);
        }
      });

      return {
        ...state,
        patientParents: list_parents
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
