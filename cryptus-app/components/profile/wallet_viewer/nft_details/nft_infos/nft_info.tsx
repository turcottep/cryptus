//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_info.module.scss";
import getNFTListedPrice from "../../../../../lib/get_nft_listed_price";

//external exports

//internal imports
import { nft } from "../../../../../lib/data_types";
import NftBuyButton from "./nft_buy_button/nft_buy_button";

export default function NftInfo(props: {
  nft: nft;
  listed_price: number;
  estimated_price: number;
}) {
  const { name, last_sale_price, external_url, collection } = props.nft;
  const listed_price = props.listed_price;
  const collection_stripped = collection.replace(/\s/g, ""); // remove all spaces from collection name

  return (
    <div className={s.container}>
      <div className={s.left}>
        <a className={s.collection} href={"/market/" + collection_stripped}>
          {collection}
        </a>
        <div className={s.name}>{name}</div>
      </div>
      <div className={s.right}>
        <NftBuyButton price={listed_price} url={external_url} />
        {props.estimated_price && `Value: ${props.estimated_price ?? "-"} eth`}
      </div>
    </div>
  );
}
