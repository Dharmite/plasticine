import { GET_THERAPISTS, ADD_THERAPIST } from "../actions/types";

const initialState = {
  therapists: [],
  therapist: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_THERAPISTS:
      return {
        ...state,
        therapists: action.payload
      };

    case ADD_THERAPIST:
      return {
        ...state,
        therapists: [...state.therapists,action.payload]
      };
    default:
      return state;
  }
}
