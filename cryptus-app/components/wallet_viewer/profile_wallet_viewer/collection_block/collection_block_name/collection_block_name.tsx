import React, { useState, useEffect } from "react";
import { nft } from "../../../../../lib/data_types";
import s from "./collection_block_name.module.scss";

//external imports

//internal imports


export default function CollectionBlockName(props: { name: string}) {
  const { name } = props;
  return (
    <div className={s.container}>
      <span>{name}</span>
    </div>
  );
}
