//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_buy_button.module.scss";

//external exports

//internal imports

export default function NftBuyButton(props: { price: number; url: string }) {
  const { price, url } = props;
  const price_clean = price.toFixed(2);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className={s.container}>
        <img className={s.eth} src="/images/eth.png" alt="eth" />
        <div className={s.price}>{price_clean}</div>
        <div className={s.line} />
        <div className={s.opensea}>
          <img src="/images/opensea.png" alt="" />
        </div>
      </div>
    </a>
  );
}
