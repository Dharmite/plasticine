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
  UPDATE_MEDICINE,
  GET_THERAPEUTIC_NOTES,
  ADD_THERAPEUTIC_NOTE,
  GET_THERAPEUTIC_NOTE,
  REMOVE_THERAPEUTIC_NOTE,
  UPDATE_THERAPEUTIC_NOTE,
  PATIENTS_LOADING,
  PATIENT_THERAPISTS_LOADING,
  ADD_COMMENT,
  GET_COMMENTS,
  LOADED,
  GET_CLINICAL_HISTORY,
  ADD_CLINICAL_HISTORY,
  GET_CLINICAL_HISTORIES,
  REMOVE_CLINICAL_HISTORY,
  UPDATE_CLINICAL_HISTORY
} from "../actions/types";

const initialState = {
  patients: [],
  patient: {},
  patientTherapists: [],
  patientParents: [],
  medicines: [],
  medicine: {},
  notes: [],
  note: {},
  clinicalNotes: [],
  clinicalNote: {},
  loading_patients: false,
  loading_patientTherapists: false,
  comments: [],
  loaded: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        loaded: action.payload
      };
    case PATIENTS_LOADING:
      return {
        ...state,
        loading_patients: true
      };

    case PATIENT_THERAPISTS_LOADING:
      return {
        ...state,
        loading_patients: true
      };

    case GET_THERAPEUTIC_NOTES:
      return {
        ...state,
        notes: action.payload
      };

    case GET_THERAPEUTIC_NOTE:
      return {
        ...state,
        note: action.payload
      };

    case REMOVE_THERAPEUTIC_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload)
      };

    case UPDATE_THERAPEUTIC_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note._id !== action.payload.id ? (note = action.payload) : note
        )
      };

    case ADD_THERAPEUTIC_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };

      case GET_CLINICAL_HISTORIES:
        return {
          ...state,
          clinicalNotes: action.payload
        };
  
      case GET_CLINICAL_HISTORY:
        return {
          ...state,
          clinicalNote: action.payload
        };
  
      case REMOVE_CLINICAL_HISTORY:
        return {
          ...state,
          clinicalNotes: state.clinicalNotes.filter(note => note._id !== action.payload)
        };
  
      case UPDATE_CLINICAL_HISTORY:
        return {
          ...state,
          clinicalNotes: state.clinicalNotes.map(note =>
            note._id !== action.payload.id ? (note = action.payload) : note
          )
        };
  
      case ADD_CLINICAL_HISTORY:
        return {
          ...state,
          clinicalNotes: [...state.clinicalNotes, action.payload]
        };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };

      case GET_COMMENTS:
        return {
          ...state,
          comments: action.payload
        }; 

    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
        loading_patients: false
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
        medicines: state.medicines.map(medicine =>
          medicine._id !== action.payload.id
            ? (medicine = action.payload)
            : medicine
        )
      };

    case ADD_MEDICINE:
      return {
        ...state,
        medicines: [...state.medicines, action.payload]
      };
    case GET_PATIENT_THERAPISTS:
      return {
        ...state,
        patientTherapists: action.payload,
        loading_patientTherapists: false
      };

    case GET_PATIENT_PARENTS:
      return {
        ...state,
        patientParents: action.payload
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
