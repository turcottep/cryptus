//react and css
import React, { useState, useEffect } from "react";
import s from "./search_bar.module.scss";

//external exports

//internal imports

export default function SearchBar() {
  return (
    <div className={s.container}>
      <div className={s.box}>
        <img src="magnifier.svg" className={s.magnifier} />
        <input
          type="text"
          className={s.searchTerm}
          placeholder="Search comming soon"
        />
      </div>
    </div>
  );
}
