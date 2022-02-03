//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_buy_button.module.scss";

//external exports

//internal imports
import { nft } from "../../../../../lib/data_types";

export default function NFTBuyButton(props: { nft: nft }) {
    const { last_sale_price, external_url } = props.nft;
    const price = last_sale_price ? last_sale_price : 0;
    return (
        <a className={s.container} href={external_url} target="_blank" rel="noopener noreferrer">
            <Eth />
            <Price {...{ price }} />
            <div className={s.line} />
            <Opensea />
        </a>
    );
}

const Eth = () => {
    return (
        <div className={s.eth}>
            <img src="/images/eth.png" alt="eth" />
        </div>
    );
};


const Price = (props: { price: Number }) => {
    const { price } = props;
    return (
        <div className={s.price}>
            {price}
        </div>
    );
}

const Opensea = () => {
    return (
        <div className={s.opensea}>
            <img src="/images/opensea.png" alt="opensea" />
        </div>
    );
}