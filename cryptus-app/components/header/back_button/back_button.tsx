import React, { useEffect, useState } from "react";
import s from "./back_button.module.scss";

// Discussed with Guillaume : even if component is one liner, it should be in a separate file, 
// because backend will need to be included in the file, and we do not want backend from all buttons in header.tsx
export default function BackButton(props: { url: string }) {
  return (
    <a href={props.url} target="_blank" className={s.icon}>
      <img src="icons/back_icon.png" />
    </a>
  );
}
