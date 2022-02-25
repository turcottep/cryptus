//react and css
import React, { useState, useEffect } from "react";
import DateComponent from "./date/date";
import s from "./market_header.module.scss";

//external exports

//internal imports
import ModifyFavoriteCollectionsButton from "./modify_favorite_collections_button/modify_favorite_collections_button";
// HERE import green contextual_page_name (commun)
// import contextual_page_name from "./contextual_page_name/contextual_page_name";

type market_header_props = {
  date: string;
};

export default function MarketHeader(props: market_header_props) {
  const today = new Date();
  // get day like August 1
  const day = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  console.log("day : ", day);

  return (
    <div className={s.container}>
      <DateComponent date={day} />
    </div>
  );
}
