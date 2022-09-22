import React, { useEffect, useState } from "react";
import s from "./footer.module.scss";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session, status } = useSession();

  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    if (session) {
      setUsername(session.user.name);
    }
  }, [status]);

  return (
    <div id="footer" className={s.container}>
      <FooterIcon
        src="/icons/market_overview_icon.png"
        href="/market"
        active={true}
      />
      <FooterIcon
        src="/icons/research_icon.png"
        href="/market"
        active={false}
      />
      <FooterIcon
        src="/icons/notification_icon.png"
        href="/market"
        active={false}
      />
      <FooterIcon
        src="/icons/profile_icon.png"
        href={`/${username}`}
        active={true}
      />
    </div>
  );
}

const FooterIcon = (props: { src: string; href; active: boolean }) => {
  if (props.active) {
    return (
      <a href={props.href} className={s.icon}>
        <img src={props.src} className={s.image} />
      </a>
    );
  } else {
    return (
      <a className={s.icon_inactive}>
        <img src={props.src} className={s.image} />
      </a>
    );
  }
};
