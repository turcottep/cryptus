import React, { useState, useEffect } from "react";
import s from "./checkmarks.module.scss";


export default function Checkmarks() {
  return (
    <div className={s.container}>
      <img 
        className={s.checkmarks} 
        src="./images/twitter_checkmark.png"
        />
    </div>
  );
}