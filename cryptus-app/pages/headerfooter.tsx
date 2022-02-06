import React, { useState, useEffect } from "react";
import s from "./headerfooter.module.scss";

import Header from "../components/header/header";
import LandingPage from "../components/landing_page/landing_page"
import Footer from "../components/footer/footer";

export default function HeaderFooter() {
  //const [myNumberState, setMyNumberState] = useState<Number>(0);
  //useEffect(() => {}, []);

  return (
    <div className={s.container}>
        <div className={s.header}>
            <Header context="username"/>
        </div>
        <div className={s.content}>
            <LandingPage />
        </div>
        <div className={s.footer}>
            <Footer />
        </div>
    </div>
  );
}