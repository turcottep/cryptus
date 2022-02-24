import React from "react";
import { nft_collection } from "../../../lib/data_types";
import s from "./collection_details.module.scss";

import CollectionHeader from "./collection_header/collection_header";
import CollectionInfos from "./collection_infos/collection_infos";
import CollectionViewer from "./collection_viewer/collection_viewer";

//Need to add prop for collection
export default function CollectionDetails(props: {
  collection: nft_collection;
}) {
  const { collection } = props;

  return (
    <div className={s.container}>
      <CollectionHeader />
      <CollectionInfos name={collection.name} number={collection.nfts.length} />
      <CollectionViewer collection={collection} />
    </div>
  );
}
