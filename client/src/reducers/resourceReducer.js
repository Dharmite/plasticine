import {
    ADD_RESOURCE,
    GET_RESOURCES,
    GET_RESOURCE,
    REMOVE_RESOURCE,
    UPDATE_RESOURCE
  } from "../actions/types";

  const initialState = {
    resources: [],
    resource: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
    //   case GET_PARENTS:
    //     return {
    //       ...state,
    //       parents: action.payload
    //     };
  
      case ADD_RESOURCE:
        return {
          ...state,
          resources: [...state.resources, action.payload]
        };
    //   case GET_PARENT:
    //     return {
    //       ...state,
    //       parent: action.payload
    //     };
  
    //   case UPDATE_PARENT:
    //     return {
    //       ...state,
    //       parents: state.parents.map(parent =>
    //         parent.id === action.payload.id ? (parent = action.payload) : parent
    //       )
    //     };
      default:
        return state;
    }
  }
  