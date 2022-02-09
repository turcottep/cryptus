//react and css
import React, { useState, useEffect } from "react";
import s from "./search_bar.module.scss";

//external exports

//internal imports

export default function MarketHeader() {
  return (
    <div className={s.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={s.magnifier}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input type="text" className={s.searchTerm} placeholder="Search" />
    </div>
  );
}
