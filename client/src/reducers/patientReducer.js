import { GET_PATIENTS, ADD_PATIENT } from "../actions/types";

const initialState = {
  patients: [],
  patient: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload
      };

    case ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients,action.payload]
      };
    default:
      return state;
  }
}
