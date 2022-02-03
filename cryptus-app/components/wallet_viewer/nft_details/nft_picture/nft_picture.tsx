//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_picture.module.scss";

//external exports

//internal imports

export default function NftPicture(props: {
  image_url: string;
  description: string;
}) {
  return (
    <div className={s.container}>
      <img className={s.image} src={props.image_url} alt={props.description} />
    </div>
  );
}
