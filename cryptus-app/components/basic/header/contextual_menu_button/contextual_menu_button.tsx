import React, { useEffect, useState } from "react";
import s from "./contextual_menu_button.module.scss";
import router from "next/router";
import connectMetamask from "../../../../lib/connectMetamask";

export default function ContextualMenuButton(props: {
  img: string;
  url?: string;
  open_settings?;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { img, url, setLoading } = props;

  const onMenuClick = () => {
    if (img == "/icons/menu_icon.png") {
      connectMetamask({ setLoading });
    } else {
      props.open_settings();
    }
  };

  return (
    <div onClick={onMenuClick} className={s.icon}>
      <img src={img} className={s.image} />
    </div>
  );
}
