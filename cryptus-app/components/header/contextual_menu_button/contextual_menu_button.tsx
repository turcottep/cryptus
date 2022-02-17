import React, { useEffect, useState } from "react";
import s from "./contextual_menu_button.module.scss";


// Discussed with Guillaume : even if component is one liner, it should be in a separate file, 
// because backend will need to be included in the file, and we do not want backend from all buttons in header.tsx
export default function ContextualMenuButton(props: {
  img: string;
  url: string;
}) {
  return (
    <a href={props.url} target="_blank" className={s.icon}>
      <img src={props.img} />
    </a>
  );
}
