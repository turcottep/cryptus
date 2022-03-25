import React, { useState, useEffect } from "react";
import s from "./viewer_header.module.scss";

import { useRouter } from "next/router";

import BackButton from "../../../header/back_button/back_button";
import ContextualMenuButton from "../../../header/contextual_menu_button/contextual_menu_button";
import ContextualUserName from "../../../header/contextual_username/contextual_username";

export default function ViewerHeader(props: { userId: string }) {
  return (
    <div className={s.container}>
      <BackButton url={`/${props.userId}`} />
      <ContextualUserName name={props.userId} />
      <ContextualMenuButton img="icons/menu_icon.png" />
    </div>
  );
}
