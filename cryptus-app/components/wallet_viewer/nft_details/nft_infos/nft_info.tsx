//react and css
import React, { useState, useEffect } from "react";
import NFTBuyButton from "./nft_buy_button/nft_buy_button";
import s from "./nft_info.module.scss";

//external exports

//internal imports
import { nft } from "../../../../lib/data_types";

export default function NFTInfo(props: { nft: nft }) {

    return (
        <div className={s.container}>
            <div className={s.left}>
                <NFTCollection {...props} />
                <NFTName {...props} />
            </div>
            <NFTBuyButton {...props} />
        </div>
    );
}

const NFTCollection = (props: { nft: nft }) => {
    const { collection } = props.nft;
    const collection_stripped = collection.replace(/\s/g, "");   // remove all spaces from collection name

    return (
        <a className={s.collection} href={"/market_overview/" + collection_stripped}>
            {collection}
        </a>
    );
}

const NFTName = (props: { nft: nft }) => {
    const { name } = props.nft;
    return (
        <div className={s.name}>
            {name}
        </div>
    );
}