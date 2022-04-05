import React from "react";
import s from "./favorite_collections.module.scss";

import CollectionRow from "../collection_row/collection_row";
import { collection } from "../market_viewer";

// Need to add prop for collections
export default function FavoriteCollections(props: {
  collections: collection[];
}) {
  return (
    <div id="favorite_collections" className={s.container}>
      <FavoriteCollectionsHeader />
      <div className={s.favorites}>
        {props.collections ? (
          props.collections.map((c) => (
            <div key={c.id} className={s.collection}>
              <CollectionRow collection={c} />
            </div>
          ))
        ) : (
          <div>No collections</div>
        )}
      </div>
    </div>
  );
}

const FavoriteCollectionsHeader = () => (
  <div className={s.header}>
    <div className={s.icon}>
      <img src="/icons/star_icon.png" />
    </div>
    <div className={s.label}>Favorites</div>
  </div>
);
