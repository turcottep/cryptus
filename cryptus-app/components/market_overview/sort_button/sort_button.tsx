//react and css
import React, { useState, useEffect } from "react";
import s from "./sort_button.module.scss";

//external exports

//internal imports

export default function SortButton() {
  return (
    <div className={s.container}>
      <div className={s.box}>
        <img src="menu.svg" className={s.menu} />
        <div className={s.text}>Sort</div>
      </div>
    </div>
  );
}
