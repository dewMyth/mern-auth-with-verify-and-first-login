import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";
import BASE_URL from "../BASE_URL";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    console.log(user);

    await axios
      .post(BASE_URL + "/user/login", user)
      .then((res) => {
        if (res.data.user.isFirstLogin === true) {
          navigate("/verify", { state: { email: email } });
        } else {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className="input">
          <TextField
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input">
          <Button
            variant="contained"
            style={{ width: "220px" }}
            onClick={onLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
