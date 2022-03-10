import React, { Component } from "react";

import s from "./forgot_password_header.module.scss";

type MyProps = {
  title: String;
  step: Number;
};

export default function ForgotPWHeader(props) {
  return (
    <div className={s.container}>
      <div className={s.dot_container}>
        <p className={s.active_dot}>&#9679;</p>
        {props.step < 2 ? <p className={s.gray_dot}>&#9679;</p> : null}
        {props.step >= 2 ? <p className={s.active_dot}>&#9679;</p> : null}
        {props.step < 3 ? <p className={s.gray_dot}>&#9679;</p> : null}
        {props.step >= 3 ? <p className={s.active_dot}>&#9679;</p> : null}
      </div>
      <div className={s.title}>{props.title}</div>
    </div>
  );
}
