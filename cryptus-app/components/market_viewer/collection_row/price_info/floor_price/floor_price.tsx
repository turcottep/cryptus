import React, { useEffect, useState } from "react";
import s from "./floor_price.module.scss";


// Need to add more display options (different currencies, # of digits after comma, etc.)
export default function FloorPrice(props: {price: number, currency: string}) {
    const {price, currency} = props;
    if (currency=="eth") {
        return(
            <div className={s.price}>{price.toFixed(1) + "Ξ"}</div>
        )
    } else if (currency=="usd") {
        const conversion = 3130.43
        const new_price = (price*conversion)/1000
        return(
            <div className={s.price}>{new_price.toFixed(1) + "k$"}</div>
        )
    }      
}