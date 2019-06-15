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
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

import axios from "axios";

export const getResources = () => async dispatch => {
  const res = await axios.get("/api/resource/");
  dispatch({
    type: GET_RESOURCES,
    payload: res.data
  });
};

export const getResource = id => async dispatch => {
  const res = await axios.get(`/api/resource/${id}`);
  dispatch({
    type: GET_RESOURCE,
    payload: res.data
  });
};

export const addResource = newResource => async dispatch => {
  const res = await axios.post("api/resource/new", newResource);

  if (newResource.category == "Percepção") {
    dispatch({
      type: ADD_PERCEPCAO,
      payload: res.data
    });
  } else if (newResource.category == "Motricidade") {
    dispatch({
      type: ADD_MOTRICIDADE,
      payload: res.data
    });
  } else if (newResource.category == "Desenvolvimento Verbal") {
    dispatch({
      type: ADD_DESENVOLVIMENTO_VERBAL,
      payload: res.data
    });
  } else if (newResource.category == "Memória") {
    dispatch({
      type: ADD_MEMORIA,
      payload: res.data
    });
  } else if (newResource.category == "Desenvolvimento Emocional-Social") {
    dispatch({
      type: ADD_EMOCIONAL_SOCIAL,
      payload: res.data
    });
  } else if (newResource.category == "Áreas Numéricas") {
    dispatch({
      type: ADD_AREAS_NUMERICAS,
      payload: res.data
    });
  } else {
    dispatch({
      type: ADD_AVD,
      payload: res.data
    });
  }

  dispatch({
    type: ADD_RESOURCE,
    payload: res.data
  });
};

export const updateResource = (resource_id, newResource) => async dispatch => {
  const res = await axios.post(`/api/resource/${resource_id}`, newResource);
  dispatch({
    type: UPDATE_RESOURCE,
    payload: res.data
  });
};

export const removeResource = resource_id => async dispatch => {
  const res = await axios.delete(`/api/resource/${resource_id}`);
  dispatch({
    type: REMOVE_RESOURCE,
    payload: res.data
  });
};

export const getResourceByCategory = category_name => async dispatch => {
  const res = await axios.get(`/api/resource/category/${category_name}`);

  if (category_name == "Percepção") {
    dispatch({
      type: GET_PERCEPCAO,
      payload: res.data
    });
  } else if (category_name == "Motricidade") {
    dispatch({
      type: GET_MOTRICIDADE,
      payload: res.data
    });
  } else if (category_name == "Desenvolvimento Verbal") {
    dispatch({
      type: GET_DESENVOLVIMENTO_VERBAL,
      payload: res.data
    });
  } else if (category_name == "Memória") {
    dispatch({
      type: GET_MEMORIA,
      payload: res.data
    });
  } else if (category_name == "Desenvolvimento Emocional-Social") {
    dispatch({
      type: GET_EMOCIONAL_SOCIAL,
      payload: res.data
    });
  } else if (category_name == "Áreas Numéricas") {
    dispatch({
      type: GET_AREAS_NUMERICAS,
      payload: res.data
    });
  } else {
    dispatch({
      type: GET_AVD,
      payload: res.data
    });
  }
};

export const getComments = resource_id => async dispatch => {
  try {
    const res = await axios.get(`api/therapeuticNote/${resource_id}/feedback`);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });

    dispatch(clearErrors());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const addComment = (resource_id, newFeedback) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/resource/${resource_id}/feedback`,
      newFeedback
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(clearErrors());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
