import React, { useEffect, useState } from "react";
import s from "./current_page_icon.module.scss";

// Discussed with Guillaume : even if component is one liner, it should be in a separate file, 
// because backend will need to be included in the file, and we do not want backend from all buttons in footer.tsx
export default function CurrentPageIcon(props: { icon: string }) {
  return (
    <div className={s.icon}>
      <img src={props.icon} />
    </div>
  );
}
