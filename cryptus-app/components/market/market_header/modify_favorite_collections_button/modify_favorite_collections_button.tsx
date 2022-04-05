//react and css
import React, { useState, useEffect } from "react";
import s from "./modify_favorite_collections_button.module.scss";

//external exports

//internal imports

export default function ModifyFavoriteCollectionsButton() {
  return (
    <div className={s.container}>
      <div className={s.button}>Modify</div>
    </div>
  );
}
