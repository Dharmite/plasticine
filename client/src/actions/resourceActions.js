import {
  ADD_RESOURCE,
  GET_RESOURCES,
  GET_RESOURCE,
  REMOVE_RESOURCE,
  UPDATE_RESOURCE
} from "./types";

import axios from "axios";

export const addResource = newResource => async dispatch => {
  const res = await axios.post("api/resource/new", newResource);

  dispatch({
    type: ADD_RESOURCE,
    payload: res.data
  });
};

//   export const getResources = () => async dispatch => {
//     const res = await axios.get("/api/resouce/");

//     dispatch({
//       type: GET_PARENTS,
//       payload: res.data
//     });
//   };

//   export const getResource = id => async dispatch => {
//     const res = await axios.get(`/api/users/parent/${id}`);
//     dispatch({
//       type: GET_PARENT,
//       payload: res.data
//     });
//   };

//   export const updateResource = (resource_id, newResource) => async dispatch => {
//     const res = await axios.post(
//       `/api/resource/${resource_id}`,
//       newResource
//     );
//     dispatch({
//       type: UPDATE_RESOURCE,
//       payload: res.data
//     });
//   };

//   export const removeResource = (resource_id) => async dispatch => {
//     const res = await axios.delete(
//       `/api/resource/${resource_id}`,
//       newResource
//     );
//     dispatch({
//       type: REMOVE_RESOURCE,
//       payload: res.data
//     });
//   };
