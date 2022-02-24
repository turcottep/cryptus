import React, { useState, useEffect } from "react";
import s from "./viewer_header.module.scss";

import { useRouter } from "next/router";

import BackButton from "../../../header/back_button/back_button";
import ContextualMenuButton from "../../../header/contextual_menu_button/contextual_menu_button";
import ContextualUserName from "../../../header/contextual_username/contextual_username";

export default function ViewerHeader() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div className={s.container}>
      <BackButton url={`/${userId}`} />
      <ContextualUserName name={userId.toString()} />
      <ContextualMenuButton img="icons/menu_icon.png" />
    </div>
  );
}
