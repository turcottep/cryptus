import React from "react";
import Router from "next/router";
import s from "./contextual_x_button.module.scss";

// Discussed with Guillaume : even if component is one liner, it should be in a separate file,
// because backend will need to be included in the file, and we do not want backend from all buttons in header.tsx
// function backPath(pathname) {
//   let pathname_array = pathname.split("/")
//   pathname_array.splice(-1)
//   pathname = pathname_array.join("/")
//   return pathname
// }
export default function ContextualXButton() {
  return (
    <a onClick={() => Router.back()} target="_blank" className={s.icon}>
      <img src="/icons/x_icon.png" />
    </a>
  );
}
