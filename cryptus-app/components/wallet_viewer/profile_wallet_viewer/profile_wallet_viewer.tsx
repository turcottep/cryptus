import React, { useState, useEffect } from "react";
import s from "./profile_wallet_viewer.module.scss";

import Collection_block from "./collection_block/collection_block";


export default function PageTemplate() {
  const [myNumberState, setMyNumberState] = useState<Number>(0);
  useEffect(() => {}, []);

  return (
    <div className={s.app}>

      <div className={s.container}>
        <div className={s.items}>
        Profile wallet viewer 1
          <Collection_block />
        </div>
      </div>

      <div className={s.container}>
      </div>

      <Collection_block />

    </div>
  );
}
