import React from "react";
import s from "./favorite_button.module.scss";

export default function FavoriteButton() {
  return (
    <a href="login" target="_blank">
      <img className={s.icon} src="/icons/favorite_icon.png" />
    </a>
  );
}
