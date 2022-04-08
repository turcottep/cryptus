import React, { useState, useEffect } from "react";
import s from "./viewer_header.module.scss";

import { useRouter } from "next/router";

import BackButton from "../../../basic/header/back_button/back_button";
import ContextualMenuButton from "../../../basic/header/contextual_menu_button/contextual_menu_button";
import ContextualUserName from "../../../basic/header/contextual_username/contextual_username";

export default function ViewerHeader(props: {
  userId: string;
  setLoading: any;
}) {
  const { setLoading } = props;
  return (
    <div className={s.container}>
      <BackButton />
      <ContextualUserName name={props.userId} />
      <ContextualMenuButton img="icons/menu_icon.png" setLoading={setLoading} />
    </div>
  );
}
