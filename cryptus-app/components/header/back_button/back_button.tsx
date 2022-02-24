import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import s from "./back_button.module.scss";

// Discussed with Guillaume : even if component is one liner, it should be in a separate file,
// because backend will need to be included in the file, and we do not want backend from all buttons in header.tsx
export default function BackButton(props: { url?: string }) {
  const router = useRouter();

  const onButtonClick = () => {
    if (props.url) {
      router.push(props.url);
    } else {
      router.back();
    }
  };

  return (
    <a onClick={onButtonClick} target="_blank" className={s.icon}>
      <img src="/icons/back_icon.png" className={s.image} />
    </a>
  );
}
