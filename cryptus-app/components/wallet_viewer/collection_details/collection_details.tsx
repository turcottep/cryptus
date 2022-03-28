import React from "react";
import s from "./collection_details.module.scss";

import { nft_collection } from "../../../lib/data_types";

import CollectionHeader from "./collection_header/collection_header";
import CollectionInfos from "./collection_infos/collection_infos";
import CollectionViewer from "./collection_viewer/collection_viewer";
import DesktopHeader from "../../header/desktop_header/desktop_header";
import Card from "../../utils/card/card";

//Need to add prop for collection
export default function CollectionDetails(props: {
  collection: nft_collection;
  isMobile: boolean;
  callback_close;
  open_nft;
}) {
  const { collection, isMobile } = props;

  return (
    <Card callback_close={props.callback_close}>
      <CollectionInfos name={collection.name} number={collection.nfts.length} />
      <CollectionViewer collection={collection} open_nft={props.open_nft} />
    </Card>
  );
}
