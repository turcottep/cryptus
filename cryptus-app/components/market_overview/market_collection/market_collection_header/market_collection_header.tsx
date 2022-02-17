import React, { useState, useEffect } from "react";
import s from "./market_collection_header.module.scss";

import ContextualXButton from "../../../header/contextual_x_button/contextual_x_button"
import FavoriteButton from "./favorite_button/favorite_button"
import NotificationBell from "./notification_bell/notification_bell"


export default function MarketCollectionHeader() {
  return (
    <div className={s.container}>
      <div className={s.left_container}>
        <FavoriteButton/>
        <NotificationBell/>
      </div>
      <div className={s.right_container}>
        <ContextualXButton/>
      </div>
    </div>
  );
}