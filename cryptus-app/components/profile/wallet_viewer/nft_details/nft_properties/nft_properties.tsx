//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_properties.module.scss";

//internal imports
import PropertyBlock from "./property_block/property_block";

export default function NFTProperties(props: {
  properties: [];
  collectionSize: number;
}) {
  return (
    <div className={s.container}>
      {props.properties.map((prop, index) => {
        const prop_t = prop as any;
        return (
          <PropertyBlock
            key={index}
            collectionSize={props.collectionSize}
            name={prop_t.name}
            value={prop_t.value}
            count={prop_t.count}
            rarity={prop_t.rarity}
          />
        );
      })}
    </div>
  );
}
