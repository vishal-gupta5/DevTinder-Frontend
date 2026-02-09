import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("virat@gmail.com");
  const [password, setPassword] = useState("Virat123@");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center mt-28">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl">Log in</h2>
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
          <div className="card-actions justify-center">
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
