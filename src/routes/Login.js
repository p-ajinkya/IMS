import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginData } from "../../content";
// import { connect } from "react-redux";
import "./LoginStyles.css";
import img1 from "../assests/login.png";
import { Link } from "react-router-dom";
import { login } from "../store/action/addData";
import { Provider, useDispatch } from "react-redux";
import axiosInstance from "../services/axios";

const Login = ({ res }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  // const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/users/login", data);
      if(response.data['success'] == true){
        setToken(response.data.data)
      }
    } catch (error) {
      console.log(error); // handle the error
    }
  };

  function setToken(UserDetails) {
    sessionStorage.setItem('token', JSON.stringify(UserDetails.token));
    sessionStorage.setItem('userDetails', JSON.stringify(UserDetails.userData));
    sessionStorage.setItem('loginData', JSON.stringify(UserDetails));
    navigate("/Dashboard1")
  }
  
  function getToken() {
  }

  useEffect(() => {
    const loginData = JSON.parse(sessionStorage.getItem('loginData'));
    console.log("loginData@@@@@00", loginData);
    if (loginData && loginData.token != null) {
      // localStorage.setItem("token", loginData?.data?.token);
      // const jsonString = JSON.stringify(loginData?.data?.userDetails);
      // localStorage.setItem("userDetails", jsonString);
      // localStorage.setItem("userRole", loginData?.data?.userDetails?.role);
      // if (loginData?.data?.userDetails?.role == "SuperAdmin") {
      //   navigate("/superadmin");
      // } else {
      //   navigate("/budget-summary");
      // }
      navigate("/Dashboard1")
    }
  }, []);

  return (
    <div className="container">
      <div className="leftcontainer">
        <div className="left">
          <p className="largetext">SIGN IN</p>
          <h2 className="smalltext">Sign in to continue our application</h2>
          <div className="form">
            <div>
              <input
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                className="mb-6 p-2"
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-2"
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
            </div>
            <button
                  className="btn-blue"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
            {/* <Link to="/Dashboard1" className="btn-blue">
              Sign in
            </Link> */}
          </div>
        </div>
      </div>
      <div className="right">
        <img className="into-img" src={img1} />
      </div>
    </div>
  );
};

export default Login;
