import React from "react";
import s from "./collection_details.module.scss";

import { nft_collection } from "../../../lib/data_types";

import CollectionHeader from "./collection_header/collection_header";
import CollectionInfos from "./collection_infos/collection_infos";
import CollectionViewer from "./collection_viewer/collection_viewer";
import DesktopHeader from "../../header/desktop_header/desktop_header";

//Need to add prop for collection
export default function CollectionDetails(props: {
  collection: nft_collection;
  isMobile: boolean;
}) {
  const { collection, isMobile } = props;

  return (
    <div className={s.container}>
      {isMobile ? null : <DesktopHeader tab="profile" />}
      <CollectionHeader />
      <CollectionInfos name={collection.name} number={collection.nfts.length} />
      <CollectionViewer collection={collection} />
    </div>
  );
}
