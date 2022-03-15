import React, { useState, useEffect } from "react";
import update_collection_filter from "../../../../../lib/update_collection_filter";
import s from "./edit_nfts_button.module.scss";

export default function EditNftsButton(props: { username: string }) {
  const on_click = () => {
    console.log("clicked edit nfts button");
    update_collection_filter(props.username, [
      "0xcd223812722faf45848a431a6e0387de7ffbc2b2",
    ]);
    //reload page
    window.location.reload();
  };

  return (
    <div className={s.container}>
      <button className={s.editbutton} onClick={on_click}>
        Edit NFTs
      </button>
    </div>
  );
}
