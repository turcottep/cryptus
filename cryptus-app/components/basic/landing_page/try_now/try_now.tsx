import React, { useState, useEffect } from "react";
import s from "./try_now.module.scss";
import { useRouter } from "next/router";

import Card from "../../../utils/card/card";
import { isMobile } from "react-device-detect";
import { signIn } from "next-auth/client";

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
              src="/images/celebrity/justinbieber.png"
              className={s.image}
              onClick={() => {
                signIn("credentials", {
                  redirect: true,
                  address:
                    "0xE21DC18513e3e68a52F9fcDaCfD56948d43a11c6".toLowerCase(),
                  callbackUrl: `${window.location.origin}/justinbiebernfts`,
                });
                router.push("/justinbiebernfts");
              }}
            />
            {"Justin Bieber"}
          </div>
          <div className={s.names}>
            <img
              src="/images/celebrity/mcuban.png"
              className={s.image}
              onClick={() => {
                signIn("credentials", {
                  redirect: true,
                  address:
                    "0xa679c6154b8d4619Af9F83f0bF9a13A680e01eCf".toLowerCase(),
                  callbackUrl: `${window.location.origin}/mcuban`,
                });
              }}
            />
            {"Mark Cuban"}
          </div>
          <div className={s.names}>
            <img
              src="/images/celebrity/snoopdogg.png"
              className={s.image}
              onClick={() => {
                signIn("credentials", {
                  redirect: true,
                  address:
                    "0xce90a7949bb78892f159f428d0dc23a8e3584d75".toLowerCase(),
                  callbackUrl: `${window.location.origin}/snoopdogg`,
                });
              }}
            />
            {"Snoop Dogg"}
          </div>
          <div className={s.names}>
            <img
              src="/images/celebrity/loganpaul.png"
              className={s.image}
              onClick={() => {
                signIn("credentials", {
                  redirect: true,
                  address:
                    "0xfF0BD4AA3496739D5667AdC10e2b843DFAB5712b".toLowerCase(),
                  callbackUrl: `${window.location.origin}/logz`,
                });
              }}
            />
            {"Logan Paul"}
          </div>
        </div>
      </div>
    </Card>
  );
}
