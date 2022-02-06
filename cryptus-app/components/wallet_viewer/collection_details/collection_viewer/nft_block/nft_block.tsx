import React, { useEffect, useState } from "react";
import s from "./nft_block.module.scss";

export default function NftBlock(props: { name: string; nft: string }) {
  return (
    <div className={s.container}>
      <div className={s.none}>
        <NftPictureBlockInCollection url= "login" nft= {props.nft}/>
      </div>
      <div className={s.none}>
        <NftBlockName name={props.name} />
      </div>
    </div>
  );
}

const NftPictureBlockInCollection = (props: { url: string; nft: string }) => (
  <a href={props.url} target="_blank" className={s.img}>
      <img src={props.nft}  />
  </a>
);

const NftBlockName = (props: { name: string }) => (
  <div className={s.label}>
      {props.name}
  </div>
);