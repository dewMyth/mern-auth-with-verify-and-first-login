import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";
import BASE_URL from "../BASE_URL";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const email = location.state.email;
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const onVerify = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      OTP: otp,
    };
    console.log(user);

    await axios
      .post(BASE_URL + "/user/verifyOTP", user)
      .then((res) => {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="input">
        <TextField
          label="OTP"
          variant="outlined"
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <div className="input">
        <Button
          variant="contained"
          style={{ width: "220px" }}
          onClick={onVerify}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default Verify;
