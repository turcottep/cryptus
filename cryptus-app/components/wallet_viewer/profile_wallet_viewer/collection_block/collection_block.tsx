import React, { useState, useEffect } from "react";
import s from "./collection_block.module.scss";

import Collection_nfts from "./collection_nfts/collection_nfts";
import Collection_block_name from "./collection_block_name/collection_block_name";


export default function PageTemplate() {
  const [myNumberState, setMyNumberState] = useState<Number>(0);
  useEffect(() => {}, []);

  return (
    <div className={s.app}>
      <Collection_nfts />
      <Collection_block_name />
    </div>
  );
}
