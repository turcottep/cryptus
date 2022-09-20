import React, { useEffect, useState } from "react";
import s from "./contextual_menu_button.module.scss";
import router from "next/router";
import { session, useSession } from "next-auth/client";

export default function ContextualMenuButton(props: {
  img: string;
  open_settings;
}) {
  const { img } = props;

  const onMenuClick = () => {
    props.open_settings();
  };

  return (
    <div onClick={onMenuClick} className={s.icon}>
      <img src={img} className={s.image} />
    </div>
  );
}
