//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_rank_in_collection.module.scss";

//external exports

//internal imports

export default function NFTRankInCollection(props: { position: number, total: number }) {
    const { position, total } = props;
    return (
        <div className={s.container}>
            {`rank: ${position}/${total}`}
        </div>
    );
}
