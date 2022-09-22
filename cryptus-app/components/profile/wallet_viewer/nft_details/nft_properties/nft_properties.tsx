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
        return (
          <PropertyBlock
            key={index}
            collectionSize={props.collectionSize}
            name={""}
            value={""}
            count={0}
            rarity={0}
          />
        );
      })}
    </div>
  );
}
