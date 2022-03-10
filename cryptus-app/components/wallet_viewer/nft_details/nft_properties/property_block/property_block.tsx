//react and css
import { Value } from "@prisma/client/runtime";
import React, { useState, useEffect } from "react";
import s from "./property_block.module.scss";

//external exports

//internal imports

export default function PropretyBlock(props: {
  name: string;
  value: string;
  count: number;
  rarity: number;
  collectionSize: number;
}) {
  const { name, value, count, rarity, collectionSize } = props;

  const rarity_percentage = 100 * ((count / collectionSize) as any);
  const rarity_clean =
    rarity_percentage > 1
      ? rarity_percentage.toFixed(0)
      : rarity_percentage.toFixed(2);

  return (
    <div className={s.container}>
      <div className={s.name}>{props.name.toUpperCase()}</div>
      <div className={s.value}>{props.value}</div>
      <div className={s.rarity}>{`${rarity_clean}% have this trait`}</div>
    </div>
  );
}
