import {
  GET_THERAPISTS,
  ADD_THERAPIST,
  GET_THERAPIST,
  UPDATE_THERAPIST
} from "../actions/types";

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
        therapists: [...state.therapists, action.payload]
      };

    case GET_THERAPIST:
      return {
        ...state,
        therapist: action.payload
      };

    case UPDATE_THERAPIST:
      return {
        ...state,
        therapists: state.therapists.map(therapist =>
          therapist.id === action.payload.id
            ? (therapist = action.payload)
            : therapist
        )
      };
    default:
      return state;
  }
}
