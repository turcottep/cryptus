import React, { useState, useEffect } from "react";
import s from "./edit_nfts_button.module.scss";

export default function EditNftsButton() {
  return (
    <div className={s.container}>
      <button className={s.editbutton}>Edit NFTs</button>
    </div>
  );
}
