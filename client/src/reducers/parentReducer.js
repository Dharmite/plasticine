import { GET_PARENTS, ADD_PARENT } from "../actions/types";

const initialState = {
  parents: [],
  parent: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARENTS:
      return {
        ...state,
        parents: action.payload
      };

    case ADD_PARENT:
      return {
        ...state,
        parents: [...state.parents, action.payload]
      };
    default:
      return state;
  }
}
