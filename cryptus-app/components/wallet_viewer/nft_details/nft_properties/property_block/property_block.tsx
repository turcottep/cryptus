//react and css
import React, { useState, useEffect } from "react";
import s from "./property_block.module.scss";

//external exports

//internal imports

export default function PropretyBlock(props: { name: string, value: string, rarity: Number }) {
    const { name, value, rarity } = props;

    return (
        <div className={s.container}>
            <div className={s.block}>
                <PropertyName name={name} />
                <PropertyValue value={value} />
                <PropertyRarity rarity={rarity} />
            </div>
        </div>
    );
}

const PropertyName = (props: { name: string }) => {
    const { name } = props;
    return (
        <div className={s.name}>
            {name.toUpperCase()}
        </div>
    );
}

const PropertyValue = (props: { value: string }) => {
    const { value } = props;
    return (
        <div className={s.value}>
            {value}
        </div>
    );
}

const PropertyRarity = (props: { rarity: any }) => {
    const { rarity } = props
    const rarity_percentage = (100 * rarity)
    const rarity_clean = rarity_percentage > 1 ? rarity_percentage.toFixed(0) : rarity_percentage.toFixed(2);

    return (
        <div className={s.rarity}>
            {rarity_clean}% have this trait
        </div>
    );
}