import React, { Component } from "react";
import ForgotPWHeader from "./forgot_password_header";
import Input from "@material-tailwind/react/Input";
import { ForgotPWValuesProps } from "./forgot_password";

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
        <Input
          type="password"
          id="password"
          onChange={props.handleChange}
          placeholder="Password"
          outline={true}
          size="lg"
          color="brown"
          required
        />
      </div>
      <div className={s.input}>
        <Input
          type="password"
          id="confirmpassword"
          onChange={props.handleChange}
          placeholder="Confirm Password"
          outline={true}
          size="lg"
          color="brown"
          required
        />
      </div>
      <button className={s.button}>Set new password</button>
    </div>
  );
}
