//react and css
import { count } from "console";
import React, { useState, useEffect } from "react";
import s from "./property_block.module.scss";

//external exports

//internal imports

export default function PropretyBlock(props: {
  name: string;
  value: string;
  count: number;
  rarity: number;
  collection_size: number;
}) {
  const { name, value, count, rarity } = props;
  const rarity_percentage = (100 / props.collection_size) * (count as any);
  const rarity_clean =
    rarity_percentage > 1
      ? rarity_percentage.toFixed(0)
      : rarity_percentage.toFixed(2);

  return (
    <div className={s.container}>
      <div className={s.block}>
        <div className={s.name}>{name.toUpperCase()}</div>
        <div className={s.value}>{value}</div>
        <div className={s.rarity}>{`${rarity_clean}% have this trait`}</div>
      </div>
    </div>
  );
}
