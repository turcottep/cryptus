//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_info.module.scss";

//external exports

//internal imports
import { nft } from "../../../../lib/data_types";
import NftBuyButton from "./nft_buy_button/nft_buy_button";
import getNFTListedPrice from "../../../../lib/get_nft_listed_price";

export default function NftInfo(props: { nft: nft }) {
  const { name, external_url, collection } = props.nft;
  const collection_stripped = collection.replace(/\s/g, ""); // remove all spaces from collection name
  const contract_address = props.nft.collection_address;
  const token_id = props.nft.token_id;
  let [listed_price, setListed_price] = useState(0);

  useEffect(() => {
    collectionCall();
  }, []);

  const collectionCall = async () => {
    try {
      setListed_price(await getNFTListedPrice(contract_address, token_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.left}>
        <a className={s.collection} href={"/market/" + collection_stripped}>
          {collection}
        </a>
        <div className={s.name}>{name}</div>
      </div>
      <NftBuyButton price={listed_price} url={external_url} />
    </div>
  );
}
