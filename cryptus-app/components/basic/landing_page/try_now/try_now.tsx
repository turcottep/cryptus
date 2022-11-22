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
  return (
    <div>
      <Card callback_close={props.callback_close} isMobile={props.isMobile}>
        <div className={s.container}>
          {isMobile ? (
            <div className={s.tryNowMobile}>{"Try Now Mobile"}</div>
          ) : (
            <div className={s.tryNow}>{"Try Now"}</div>
          )}
        </div>
      </Card>
    </div>
  );
}
