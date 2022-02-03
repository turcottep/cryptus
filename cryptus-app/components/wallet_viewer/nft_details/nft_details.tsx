//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_details.module.scss";

//external exports

//internal imports
import { nft } from "../../../lib/data_types";

import NFTHeader from "./nft_header/nft_header";
import NFTInfo from "./nft_infos/nft_info";
import NFTPicture from "./nft_picture/nft_picture";
import NFTProperties from "./nft_properties/nft_properties";
import NFTRankInCollection from "./nft_rank_in_collection/nft_rank_in_collection";

type nft_details_props = {
    nft: nft,
    rank_props: {
        position: number,
        total: number
    }
};

export default function NFTDetails(props: nft_details_props) {
    return (
        <div className={s.container}>
            <NFTHeader />
            <NFTPicture {...props} />
            <NFTInfo {...props} />
            <NFTRankInCollection {...props.rank_props} />
            <NFTProperties {...props} />
        </div>
    );
}
