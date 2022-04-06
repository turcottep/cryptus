//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_details.module.scss";
import Switch from "@mui/material/Switch";

import { nft } from "../../../../lib/data_types";

import NftInfo from "./nft_infos/nft_info";
import NFTProperties from "./nft_properties/nft_properties";
import NFTRankInCollection from "./nft_rank_in_collection/nft_rank_in_collection";
import Card from "../../../utils/card/card";
import getNFTListedPrice from "../../../../lib/get_nft_listed_price";
import getCollectionTokenWithOpensea from "../../../../lib/get_collection_token";
import FindCollectionRarityData from "../../../../lib/findCollectionRarityData";

type nft_details_props = {
  nft: nft;
  isMobile: boolean;
  callback_close;
  callback_profile_image_url;
  isMyProfile: Boolean;
  username: string;
  profile_image_url: string;
};

export default function NFTDetails(props: nft_details_props) {
  const callback_profile_image_url = props.callback_profile_image_url;
  const [[rank_position, rank_total], setRank] = useState([0, NaN]);
  const [listed_price, set_listed_price] = useState(0.0);

  const get_props = async () => {
    let rarity_rank: number = 0;
    let collectionSize: number = await getCollectionTokenWithOpensea(
      props.nft.collection_address,
      props.nft.token_id
    );

    const CollectionRarityData = await FindCollectionRarityData(
      props.nft.collection_address,
      props.nft.token_id
    );
    if (CollectionRarityData.length > 0) {
      rarity_rank = CollectionRarityData[0].rarity_rank;
    }

    const listed_price_temp = await getNFTListedPrice(
      props.nft.collection_address,
      props.nft.token_id
    );

    console.log(
      "listed_price_temp",
      listed_price_temp,
      "rariry_rank",
      rarity_rank,
      "collectionSize",
      collectionSize
    );
    set_listed_price(listed_price_temp);
    setRank([rarity_rank, collectionSize]);
  };

  useEffect(() => {
    get_props();
  }, []);

  const handleImageChange = async (e) => {
    await updateUserProfileImageUrl(props.username, props.nft.image_url);
    callback_profile_image_url(props.nft.image_url);
  };
  // Check if the image url is the same as the one in the database
  let defaultState = false;
  if (props.nft.image_url === props.profile_image_url) {
    defaultState = true;
  }

  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.container}>
        <img className={s.image} src={props.nft.image_url} alt="nft" />
        <NftInfo
          nft={props.nft}
          listed_price={listed_price}
          estimated_price={props.nft.value}
        />
        {rank_position ? (
          <NFTRankInCollection position={rank_position} total={rank_total} />
        ) : null}
        {props.isMyProfile ? (
          <div>
            Put as profile picture :
            <Switch
              defaultChecked={defaultState}
              onChange={handleImageChange}
            />
          </div>
        ) : null}

        <NFTProperties
          properties={props.nft.properties}
          collectionSize={rank_total}
        />
      </div>
    </Card>
  );
}

async function updateUserProfileImageUrl(username: string, image_url: string) {
  console.log("updateUser");

  const response = await fetch("api/users/updateImageUrl", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      image_url,
    }),
  });
  console.log("response edit_profile_image", response);
  return response;
}
