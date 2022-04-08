import React, { useEffect, useState } from "react";
import s from "./contextual_menu_button.module.scss";
import router from "next/router";
import { session, useSession } from "next-auth/client";

// Discussed with Guillaume : even if component is one liner, it should be in a separate file,
// because backend will need to be included in the file, and we do not want backend from all buttons in header.tsx
export default function ContextualMenuButton(props: {
  img: string;
  url?: string;
}) {
  const { img, url } = props;
  const [session, loading] = useSession();

  const onMenuClick = () => {
    if (session) {
      router.push("./settings");
    } else {
      console.log("not logged in");
    }
  };

  return (
    <div onClick={onMenuClick} className={s.icon}>
      <img src={img} className={s.image} />
    </div>
  );
}
