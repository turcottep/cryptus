import React, { useEffect, useState } from "react";
import s from "./collection_details.module.scss";

import Header from "../../header/header"
import CollectionInfos from "./collection_infos/collection_infos"
import CollectionViewer from "./collection_viewer/collection_viewer"

//Need to add prop for collection
export default function CollectionDetails() {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <Header context="empty"/>
      </div>
      <div className={s.infos}>
        <CollectionInfos name="CryptoPunks" number = {5} />
      </div>
      <div className={s.viewer}>
        <CollectionViewer/>
      </div>
    </div>
  );
}
