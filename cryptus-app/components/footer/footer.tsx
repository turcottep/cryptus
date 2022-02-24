import React, { useEffect, useState } from "react";
import s from "./footer.module.scss";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div id="footer" className={s.container}>
      <FooterIcon src="/icons/market_overview_icon.png" href="/" />
      <FooterIcon src="/icons/research_icon.png" href="/" />
      <FooterIcon src="/icons/notification_icon.png" href="/" />
      <FooterIcon src="/icons/profile_icon.png" href={userId} />
    </div>
  );
}

const FooterIcon = (props: { src: string; href }) => {
  return (
    <a href={props.href} className={s.icon}>
      <img src={props.src} className={s.image} />
    </a>
  );
};
