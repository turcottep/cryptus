import React, { useEffect, useState } from "react";
import s from "./metamask.module.scss";

import { signOut } from "next-auth/client";
import connectMetamask from "../../../lib/connectMetamask";

const MetamaskButton2 = (props: { session; setLoading; isMobile: boolean }) => {
  const { session, setLoading } = props;
  return (
    <div className={s.signin}>
      {!session ? (
        <div
          className={s.button}
          onClick={() => connectMetamask(setLoading, props.isMobile)}
        >
          {"SIGN IN"}
        </div>
      ) : (
        <div className={s.button} onClick={() => signOut()}>
          {"SIGN OUT"}
        </div>
      )}
    </div>
  );
};

export default MetamaskButton2;
