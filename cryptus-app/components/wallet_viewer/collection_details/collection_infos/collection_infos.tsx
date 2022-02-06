import React, { useEffect, useState } from "react";
import s from "./collection_infos.module.scss";

export default function CollectionInfos(props: { name: string; number: number }) {
  return (
    <div className={s.container}>
      <div className={s.name}>
        <CollectionName name={props.name}/>
      </div>
      <div className={s.number}>
        <OwnedNftsFromCollectionNumber number={props.number} />
      </div>
      <div className={s.empty}></div>
    </div>
  );
}

const CollectionName = (props: { name: string }) => (
  <div className={s.label}>
      {props.name}
  </div>
);

const OwnedNftsFromCollectionNumber = (props: { number: number }) => (
  <div className={s.circle}>
      {props.number.toString()}
  </div>
);
