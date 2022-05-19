import React, { useEffect, useState } from "react";
import s from "./contextual_username.module.scss";

// Discussed with Guillaume : even if component is one liner, it should be in a separate file, 
// because backend will need to be included in the file, and we do not want backend from all buttons in header.tsx
export default function ContextualUserName(props: { name: string }) {
  return <div className={s.label}>{props.name}</div>;
}
