import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl">
            {isLoggedIn ? "Log In" : "Sign Up"}
          </h2>
          {!isLoggedIn && (
            <>
              <label className="label">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="input"
                placeholder="First Name"
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="input"
                placeholder="Last Name"
              />
            </>
          )}
          <label className="label">Email</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => {
              setEmailId(e.target.value);
            }}
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input"
            placeholder="Password"
          />
          <p className="text-red-400 font-bold">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn" onClick={isLoggedIn ? handleLogin : handleSignup}>
              {isLoggedIn ? "Login" : "Signup"}
            </button>
          </div>

          <p
            className="text-center cursor-pointer font-semibold"
            onClick={() => setIsLoggedIn((value) => !value)}
          >
            {isLoggedIn ? "New User? SignUp here" : "Existing User? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
