import React, { useState, useEffect } from "react";
import s from "./try_now.module.scss";
import { useRouter } from "next/router";

import Card from "../../../utils/card/card";
import { isMobile } from "react-device-detect";

type try_now_props = {
  isMobile: boolean;
  callback_close: () => void;
};

export default function TryNow(props: try_now_props) {
  const router = useRouter();

  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.container}>
        <div className={s.title}>
          {"Click on a celebrity to see their NFTS!"}
        </div>
        <div className={s.grid}>
          <div className={s.names}>
            <img
              src="/images/JustinBieber.png"
              className={s.image}
              onClick={() => {
                router.push("/justinbiebernfts");
              }}
            />
            {"Justin Bieber"}
          </div>
          <div className={s.names}>
            <img
              src="/images/mcuban.png"
              className={s.image}
              onClick={() => {
                router.push("/mcuban");
              }}
            />
            {"Mark Cuban"}
          </div>
          <div className={s.names}>
            <img
              src="/images/snoopdogg.png"
              className={s.image}
              onClick={() => {
                router.push("/snoopdogg");
              }}
            />
            {"Snoop Dogg"}
          </div>
          <div className={s.names}>
            <img
              src="/images/loganpaul.png"
              className={s.image}
              onClick={() => {
                router.push("/logz");
              }}
            />
            {"Logan Paul"}
          </div>
        </div>
      </div>
    </Card>
  );
}
