import React, { Component } from "react";
import { ForgotPWValuesProps } from "../forgot_password";

import s from "./forgot_password_navbar.module.scss";

export default function FormNavBar(props) {
  const next = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const back = (e) => {
    if (props.step > 1 && props.step < 5) {
      props.prevStep();
    }

    e.preventDefault();
  };
  return (
    <div id="header" className={s.container}>
      <div id="backButton" className={s.icon} onClick={back}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div className={s.title}>Forgot your password</div>
    </div>
  );
}
