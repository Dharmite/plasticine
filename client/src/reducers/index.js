import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import therapistReducer from "./therapistReducer";
import parentReducer from './parentReducer'
import patientReducer from './patientReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  therapist: therapistReducer,
  parent: parentReducer,
  patient: patientReducer
});
