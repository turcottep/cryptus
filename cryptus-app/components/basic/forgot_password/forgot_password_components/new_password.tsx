import React, { Component } from "react";
import ForgotPWHeader from "./forgot_password_header";
import { ForgotPWValuesProps } from "../forgot_password";
// import Input from "@mui/material/Input";

import s from "./new_password.module.scss";

export default function NewPassword(props) {
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
      <ForgotPWHeader title="Enter your new password" step={props.step} />
      <div className={s.input}>
        {/* <Input
          type="password"
          id="password"
          onChange={props.handleChange}
          placeholder="Password"
          required
        /> */}
      </div>
      <div className={s.input}>
        {/* <Input
          type="password"
          id="confirmpassword"
          onChange={props.handleChange}
          placeholder="Confirm Password"
          required
        /> */}
      </div>
      <button className={s.button}>Set new password</button>
    </div>
  );
}
