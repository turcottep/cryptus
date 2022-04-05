import React, { useEffect, useState } from "react";
import s from "./gridtemplate.module.scss";

export default function GridTemplate() {
  return (
    <div id="home" className={s.container}>
      <div className={s.grid1}>1</div>
      <div className={s.grid2}>2</div>
      <div className={s.grid3}>3</div>
      <div className={s.grid4}>4</div>
      <div className={s.grid5}>5</div>
      <div className={s.grid6}>6</div>
      <div className={s.grid7}>7</div>
      <div className={s.grid8}>8</div>
      <div className={s.grid9}>9</div>
      <div className={s.grid10}>10</div>
      <div className={s.grid11}>11</div>
      <div className={s.grid12}>12</div>
    </div>
  );
}
