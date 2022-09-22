import React, { Component } from "react";
import ForgotPWHeader from "./forgot_password_header";
import { ForgotPWValuesProps } from "../forgot_password";
// import Input from "@mui/material/Input";

import s from "./pin.module.scss";

export default function PINNumber(props) {
  const next = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <div className={s.container}>
      <ForgotPWHeader
        title="A 6 digit pin number was sent to your email or phone number"
        step={props.step}
      />
      <div className={s.input}>
        {/* <Input
          type="pinnumber"
          id="PINNumber"
          placeholder="Enter 6 digit PIN number"
          required
        /> */}
      </div>
      <button onClick={next} className={s.button}>
        Validate
      </button>
    </div>
  );
}
