//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_properties.module.scss";

//external exports

//internal imports
import PropertyBlock from "./property_block/property_block";

export default function NFTProperties(props: { properties_string: [] }) {
  // const propreties = JSON.parse(props.properties_string);
  const properties = props.properties_string;

  return (
    <div className={s.container}>
      {properties.map((prop, index) => {
        return <PropertyBlock key={index} {...prop} />;
      })}
    </div>
  );
}
