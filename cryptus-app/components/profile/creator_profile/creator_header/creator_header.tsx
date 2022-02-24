import React, { useState, useEffect } from "react";
import s from "./creator_header.module.scss";

import { useRouter } from "next/router";

import BackButton from "../../../header/back_button/back_button";
import ContextualMenuButton from "../../../header/contextual_menu_button/contextual_menu_button";
import ContextualPageName from "../../../header/contextual_page_name/contextual_page_name";

export default function CreatorHeader() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div className={s.container}>
      <BackButton url={`/${userId}`} />
      <ContextualPageName name={userId.toString()} />
      <ContextualMenuButton img="/icons/more_icon.png" />
    </div>
  );
}
