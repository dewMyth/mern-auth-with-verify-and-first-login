import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";
import BASE_URL from "../BASE_URL";

import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    }
    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
    console.log(user);

    await axios
      .post(BASE_URL + "/user/register", user)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
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
            label="First Name"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input">
          <TextField
            label="Last Name"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
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
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="input">
          <Button
            variant="contained"
            style={{ width: "220px" }}
            onClick={onRegister}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
