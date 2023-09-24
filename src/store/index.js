import { combineReducers } from "redux";
import {
    loginReducer
} from "./reducer/addReducer";

const rootReducer = combineReducers({
  adminLogin: loginReducer
});

export default rootReducer;
