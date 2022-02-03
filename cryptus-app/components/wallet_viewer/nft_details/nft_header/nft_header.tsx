//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_header.module.scss";

//external exports

//internal imports

export default function NFTHeader() {
    return (
        <div className={s.container}>
            <span className={s.placeholder}>{"<"}</span>
            <span className={s.placeholder}>...</span>
        </div>
    );
}
