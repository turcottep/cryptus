import React from "react";
import s from "./favorite_button.module.scss";

export default function FavoriteButton() {
  return (
    <a href="login" target="_blank" className={s.icon}>
      <img src="/icons/favorite_icon.png" />
    </a>
  );
}
