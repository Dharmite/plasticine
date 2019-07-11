import {
  GET_RESOURCES,
  GET_RESOURCE,
  ADD_RESOURCE,
  UPDATE_RESOURCE,
  REMOVE_RESOURCE,
  GET_PERCEPCAO,
  GET_MOTRICIDADE,
  GET_DESENVOLVIMENTO_VERBAL,
  GET_MEMORIA,
  GET_AREAS_NUMERICAS,
  GET_EMOCIONAL_SOCIAL,
  GET_AVD,
  ADD_PERCEPCAO,
  ADD_MOTRICIDADE,
  ADD_DESENVOLVIMENTO_VERBAL,
  ADD_MEMORIA,
  ADD_AREAS_NUMERICAS,
  ADD_EMOCIONAL_SOCIAL,
  ADD_AVD,
  ADD_COMMENT,
  GET_COMMENTS,
  LOADED
} from "../actions/types";

const initialState = {
  resources: [],
  percepcao: [],
  motricidade: [],
  desenvolvimento_verbal: [],
  memoria: [],
  areas_numericas: [],
  emocional_social: [],
  avd: [],
  resource: {},
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
    case GET_RESOURCES:
      return {
        ...state,
        resources: action.payload
      };
    case GET_PERCEPCAO:
      return {
        ...state,
        percepcao: action.payload
      };
    case ADD_PERCEPCAO:
      return {
        ...state,
        percepcao: [...state.percepcao, action.payload]
      };
    case GET_MOTRICIDADE:
      return {
        ...state,
        motricidade: action.payload
      };
    case ADD_MOTRICIDADE:
      return {
        ...state,
        motricidade: [...state.motricidade, action.payload]
      };
    case GET_DESENVOLVIMENTO_VERBAL:
      return {
        ...state,
        desenvolvimento_verbal: action.payload
      };
    case ADD_DESENVOLVIMENTO_VERBAL:
      return {
        ...state,
        desenvolvimento_verbal: [
          ...state.desenvolvimento_verbal,
          action.payload
        ]
      };
    case GET_AREAS_NUMERICAS:
      return {
        ...state,
        areas_numericas: action.payload
      };
    case ADD_AREAS_NUMERICAS:
      return {
        ...state,
        areas_numericas: [...state.areas_numericas, action.payload]
      };
    case GET_MEMORIA:
      return {
        ...state,
        memoria: action.payload
      };
    case ADD_MEMORIA:
      return {
        ...state,
        memoria: [...state.memoria, action.payload]
      };
    case GET_EMOCIONAL_SOCIAL:
      return {
        ...state,
        emocional_social: action.payload
      };
    case ADD_EMOCIONAL_SOCIAL:
      return {
        ...state,
        emocional_social: [...state.emocional_social, action.payload]
      };
    case GET_AVD:
      return {
        ...state,
        avd: action.payload
      };
    case ADD_AVD:
      return {
        ...state,
        avd: [...state.avd, action.payload]
      };
    case GET_RESOURCE:
      return {
        ...state,
        resource: action.payload
      };
    case ADD_RESOURCE:
      return {
        ...state,
        resources: [...state.resources, action.payload]
      };

    case UPDATE_RESOURCE:
      return {
        ...state,
        resources: state.resources.map(resource =>
          resource.id === action.payload.id
            ? (resource = action.payload)
            : resource
        )
      };
    case REMOVE_RESOURCE:
      return {
        ...state,
        resources: state.resources.filter(
          resource => resource._id !== action.payload
        )
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };

    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    default:
      return state;
  }
}
