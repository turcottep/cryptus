import React, { useState, useEffect } from "react";
import s from "./creator_header.module.scss";

//import BackButton from "../../../header/back_button/back_button";
//import ContextualPageName from "../../../header/contextual_page_name/contextual_page_name";
import ProfileMenuButton from "./profile_menu_button/profile_menu_button"

export default function CreatorHeader() {
    return (
    <div className={s.container}>
      {/* <BackButton />
      <ContextualPageName /> */}
      <ProfileMenuButton />
    </div>
  );
}