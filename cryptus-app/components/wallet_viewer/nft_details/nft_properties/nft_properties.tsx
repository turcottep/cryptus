//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_properties.module.scss";

//external exports

//internal imports
import { nft } from "../../../../lib/data_types";
import PropretyBlock from "./property_block/property_block";

export default function NFTProperties(props: { nft: nft }) {
    const { nft } = props;
    const propreties = JSON.parse(nft.properties);

    return (
        <div className={s.container}>
            {propreties.map((prop, index) => {
                return (
                    <PropretyBlock key={index} {...prop} />
                );
            })}
        </div>
    );
}
