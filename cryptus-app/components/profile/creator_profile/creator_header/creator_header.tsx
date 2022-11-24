import React, { useState, useEffect } from "react";
import s from "./creator_header.module.scss";

import { useRouter } from "next/router";

import BackButton from "../../../basic/header/back_button/back_button";
import ContextualMenuButton from "../../../basic/header/contextual_menu_button/contextual_menu_button";
import ContextualPageName from "../../../basic/header/contextual_page_name/contextual_page_name";
import { useSession } from "next-auth/client";

export default function CreatorHeader(props: {
  open_settings: () => void;
  open_search: () => void;
}) {
  const [session, status] = useSession();
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    if (session) {
      setUsername(session.user.name);
    }
  }, [status]);

  return (
    <div className={s.container}>
      <BackButton />
      <ContextualPageName name={username} />
      <ContextualMenuButton
        img="magnifier.svg"
        open_settings={props.open_search}
      />
      <ContextualMenuButton
        img="/icons/settings_icon.png"
        open_settings={props.open_settings}
      />
    </div>
  );
}
