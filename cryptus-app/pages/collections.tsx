import React, { useState, useEffect } from "react";
import s from "./collections.module.scss";

import CollectionDetails from "../components/wallet_viewer/collection_details/collection_details"

export default function CollectionTest() {
  //const [myNumberState, setMyNumberState] = useState<Number>(0);
  //useEffect(() => {}, []);

  return (
    <div className={s.container}>
        <CollectionDetails/>
    </div>
  );
}