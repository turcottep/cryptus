//react and css
import React, { useState, useEffect } from "react";
import s from "./sort_button.module.scss";

//external exports

//internal imports

export default function SortButton() {
  return (
    <div className={s.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={s.menu}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
      <div className={s.text}>Sort</div>
    </div>
  );
}
