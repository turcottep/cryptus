//react and css
import React, { useState, useEffect } from "react";
import s from "./market_header.module.scss";

//external exports

//internal imports
import Date from "./date/date";
import ModifyFavoriteCollectionsButton from "./modify_favorite_collections_button/modify_favorite_collections_button";
// HERE import green contextual_page_name (commun)
// import contextual_page_name from "./contextual_page_name/contextual_page_name";

type market_header_props = {
  date: string;
};

export default function MarketHeader(props: market_header_props) {
  return (
    <div className={s.container}>
      <Date date={props.date} />
      <ModifyFavoriteCollectionsButton />
    </div>
  );
}
