import React from "react";
import s from "./collection_details.module.scss";

import { nft, nft_collection } from "../../../../lib/data_types";

import Card from "../../../utils/card/card";

//Need to add prop for collection
export default function CollectionDetails(props: {
  collection: nft_collection;
  isMobile: boolean;
  callback_close;
  open_nft;
}) {
  const { collection, isMobile } = props;

  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.info_container}>
        <div className={s.label}>{collection.name}</div>
        <div className={s.circle}>{collection.nfts.length.toString()}</div>
      </div>
      <div className={s.container}>
        {collection.nfts.map((nft, i) => (
          <Nft key={i} nft={nft} index={i} open_nft={props.open_nft} />
        ))}
      </div>
    </Card>
  );
}

const Nft = (props: { nft: nft; index: number; open_nft }) => {
  const { nft } = props;
  //console.log("nft", nft);
  // const router = useRouter();
  // const { userId: userName, collectionId: collectionName } = router.query;

  // const nftName = nft.name
  //   .replace(/[^0-9a-z]/gi, " ")
  //   .replace(/\s/g, "")
  //   .toLowerCase();

  const onNftClick = () => {
    props.open_nft(nft.collection, nft.token_id);
    // router.push(`/${userName}/${collectionName}/${nftName}`);
  };

  return (
    <div className={s.collandname}>
      <div onClick={onNftClick} className={s.nft_container}>
        <img className={s.imglarge} src={nft.image_url} />
      </div>
      <div className={s.collname}>{nft.name}</div>
    </div>
  );
};
