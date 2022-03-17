import React from "react";
import Router from "next/router";
import s from "./contextual_x_button.module.scss";

// function backPath(pathname) {
//   let pathname_array = pathname.split("/")
//   pathname_array.splice(-1)
//   pathname = pathname_array.join("/")
//   return pathname
// }
export default function ContextualXButton() {
  return (
    <a onClick={() => Router.back()} target="_blank">
      <img className={s.icon} src="/icons/x_icon.png" />
    </a>
  );
}
