import React, { useState, useEffect } from "react";
import { nft } from "../../../../../lib/data_types";
import s from "./collection_block_name.module.scss";

//external imports

//internal imports


export default function PageTemplate(props: { nft: nft}) {
  const { nft } = props;
  return (
    <div className={s.container}>
      {nft.collection.toLocaleUpperCase()}
    </div>
  );
}
