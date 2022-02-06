import React, { useEffect, useState } from "react";
import s from "./header.module.scss";


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

const BackButton = (props: { url: string }) => (
  <a href={props.url} target="_blank" className={s.left_icon}>
      <img src="icons/back_icon.png" />
  </a>
);

const ContextualMenuButton = (props: { img: string; url: string }) => (
  <a href={props.url} target="_blank" className={s.right_icon}>
      <img src={props.img} />
  </a>
);

const ContextualPageName = (props: { name: string }) => (
  <div className={s.label}>
      {props.name}
  </div>
);

const ContextualUserName = (props: { name: string }) => (
  <div className={s.label}>
      {props.name}
  </div>
);
