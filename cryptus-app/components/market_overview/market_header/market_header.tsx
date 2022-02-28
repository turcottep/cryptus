//react and css
import React, { useState, useEffect } from "react";
import DateComponent from "./date/date";
import s from "./market_header.module.scss";

//external exports

//internal imports

export default function MarketHeader() {
  const today = new Date();
  // get day like August 1
  const day = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  console.log("day : ", day);

  return (
    <div className={s.container}>
      <DateComponent date={day} />
    </div>
  );
}
