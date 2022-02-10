import React, { useEffect, useState } from "react";
import s from "./header.module.scss";

import BackButton from "./back_button/back_button"
import ContextualMenuButton from "./contextual_menu_button/contextual_menu_button"
import ContextualPageName from "./contextual_page_name/contextual_page_name"
import ContextualUserName from "./contextual_username/contextual_username"

export default function Header(props: { context: string }) {
  return (
    <div id="header" className={s.container}>
      <div className={s.back_icon}>
        <BackButton url="login"/>
      </div>
      <div className={s.title}>
        <WhichLabel type={props.context} />
      </div>
      <div className={s.menu_icon}>
        <ContextualMenuButton img="icons/menu_icon.png" url="login" />
      </div>
    </div>
  );
}

//Need to add props for user and page names
function WhichLabel(props:{type: string}){
  const label_type = props.type;
  if (label_type=="username") {
    return <ContextualUserName name="Tristan_Is_Testing"/>;
  }
  else if (label_type=="pagename"){
    return <ContextualPageName name="Test"/>;
  }
  else {
    return <ContextualPageName name=""/>;
  }
}
