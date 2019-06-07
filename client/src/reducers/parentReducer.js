import {
  GET_PARENTS,
  ADD_PARENT,
  GET_PARENT,
  UPDATE_PARENT,
  PARENTS_LOADING
} from "../actions/types";

const initialState = {
  parents: [],
  parent: {},
  loading_parents: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PARENTS_LOADING:
      return {
        ...state,
        loading_parents: true
      };

    case GET_PARENTS:
      return {
        ...state,
        parents: action.payload,
        loading_parents: false
      };

    case ADD_PARENT:
      return {
        ...state,
        parents: [...state.parents, action.payload]
      };
    case GET_PARENT:
      return {
        ...state,
        parent: action.payload
      };

    case UPDATE_PARENT:
      return {
        ...state,
        parents: state.parents.map(parent =>
          parent.id === action.payload.id ? (parent = action.payload) : parent
        )
      };
    default:
      return state;
  }
}
