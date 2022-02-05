//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_header.module.scss";

//external exports

//internal imports

export default function NftHeader() {
  return (
    <div className={s.container}>
      <div className={s.placeholder}>{"<"}</div>
      <div className={s.placeholder}>...</div>
    </div>
  );
}
