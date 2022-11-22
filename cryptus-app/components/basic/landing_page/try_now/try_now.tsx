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

  const img_click = () => {
    console.log("click");
    router.push("/mcuban");
  };
  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.container}>
        <div className={s.grid}>
          <img
            src="/images/JustinBieber.png"
            className={s.image}
            onClick={() => {
              router.push("/justinbiebernfts");
            }}
          />
          <img
            src="/images/mcuban.png"
            className={s.image}
            onClick={() => {
              router.push("/mcuban");
            }}
          />
          <img
            src="/images/snoopdogg.png"
            className={s.image}
            onClick={() => {
              router.push("/snoopdogg");
            }}
          />
          <img
            src="/images/loganpaul.png"
            className={s.image}
            onClick={() => {
              router.push("/logz");
            }}
          />
        </div>
      </div>
    </Card>
  );
}
