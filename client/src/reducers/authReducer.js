import { SET_CURRENT_USER, GET_USER_PATIENTS } from "../actions/types";
import isEmpty from "../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  patients: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isAdmin: action.payload.userType === "admin" ? true : false,
        isTherapist: action.payload.userType === "therapist" ? true : false,
        isParent: action.payload.userType === "parent" ? true : false
      };

      case GET_USER_PATIENTS:
        return {
          ...state,
          patients: action.payload
        };
    default:
      return state;
  }
}
