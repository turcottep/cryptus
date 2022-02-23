//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_properties.module.scss";

//external exports

//internal imports
import PropertyBlock from "./property_block/property_block";

export default function NFTProperties(props: {
  properties_string: [];
  collection_size: number;
}) {
  // const propreties = JSON.parse(props.properties_string);
  const properties = props.properties_string;
  const collection_size = props.collection_size;

  return (
    <div className={s.container}>
      {properties.map((prop, index) => {
        return (
          <PropertyBlock
            key={index}
            {...prop}
            collection_size={collection_size}
          />
        );
      })}
    </div>
  );
}
