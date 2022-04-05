import React, { Component } from "react";
import ForgotPWHeader from "./forgot_password_header";
import { ForgotPWValuesProps } from "../forgot_password";
import Input from "@mui/material/Input";

import s from "./recovery.module.scss";

export default function Recovery(props) {
  const next = (e) => {
    // console.log(this.props.values);
    // const email = this.props.values.email;
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
        title="Enter your recovery email or phone number"
        step={props.step}
      />
      <div className={s.input}>
        <Input
          type="email"
          id="email"
          placeholder="Phone number or email"
          required
        />
      </div>
      <button onClick={next} className={s.button}>
        Send recovery email/text
      </button>
    </div>
  );
}
