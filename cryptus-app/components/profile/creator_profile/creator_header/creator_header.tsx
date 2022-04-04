import React, { useState, useEffect } from "react";
import s from "./creator_header.module.scss";

import { useRouter } from "next/router";

import BackButton from "../../../header/back_button/back_button";
import ContextualMenuButton from "../../../header/contextual_menu_button/contextual_menu_button";
import ContextualPageName from "../../../header/contextual_page_name/contextual_page_name";
import { useSession } from "next-auth/client";

export default function CreatorHeader(props: { open_settings: () => void }) {
  const [session, status] = useSession();
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    if (session) {
      setUsername(session.user.name);
    }
  }, [status]);

  return (
    <div className={s.container}>
      <BackButton
        callback_close={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ContextualPageName name={username} />
      <ContextualMenuButton
        img="/icons/settings_icon.png"
        open_settings={props.open_settings}
      />
    </div>
  );
}
