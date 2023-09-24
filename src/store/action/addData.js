import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import axiosInstance from "../../services/axios";

const token = localStorage.getItem("token");
console.log("Token: " + token);

export function login(data) {
    console.log('9 : ', data)
  return async (dispatch) => {
    console.log('11 : ', dispatch)
    try {
      const response = await axiosInstance.post(`/api/v1/users/login`, data);
      console.log("Login response", response);

      var RETURN_RESPONSE = {
        type: "ADMIN_LOGIN",
        payload: response,
      };
      dispatch(RETURN_RESPONSE);
    } catch (error) {
      console.log("Error", error);
      var RETURN_RESPONSE = {
        type: "ADMIN_LOGIN",
        payload: error,
      };
      dispatch(RETURN_RESPONSE);
    }
  };
}

export function logout() {
  console.log("iff----")
  return async (dispatch) => {
    try {
      var RETURN_RESPONSE = {
        type: "LOGOUT",
        payload: undefined,
      };
      dispatch(RETURN_RESPONSE);
    } catch (error) {}
  };
}
