//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_picture.module.scss";

//external exports

//internal imports
import { nft } from "../../../../lib/data_types";


export default function NFTPicture(props: { nft: nft }) {
    const { nft } = props;
    return (
        <div className={s.container}>
            <img className={s.image} src={nft.image_url} alt={nft.description} />
        </div>
    );
}
