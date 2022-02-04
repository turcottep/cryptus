//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_properties.module.scss";

//external exports

//internal imports
import PropretyBlock from "./property_block/property_block";

export default function NFTProperties(props: { properties_string: string }) {
  const propreties = JSON.parse(props.properties_string);

  return (
    <div className={s.container}>
      {propreties.map((prop, index) => {
        return <PropretyBlock key={index} {...prop} />;
      })}
    </div>
  );
}
