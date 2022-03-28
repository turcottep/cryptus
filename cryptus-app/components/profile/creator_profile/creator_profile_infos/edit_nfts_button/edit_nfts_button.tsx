import React, { useState, useEffect } from "react";
import update_collection_filter from "../../../../../lib/update_collection_filter";
import s from "./edit_nfts_button.module.scss";

export default function EditNftsButton(props: { username: string }) {
  const on_click = () => {
    console.log("clicked edit nfts button");
    location.href = "/show_collections";
  };

  return (
    <div className={s.container}>
      <button className={s.editbutton} onClick={on_click}>
        Edit NFTs
      </button>
    </div>
  );
}
