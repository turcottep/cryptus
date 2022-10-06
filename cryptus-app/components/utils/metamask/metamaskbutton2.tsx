import React, { useEffect, useState } from "react";
import s from "./metamask.module.scss";

import { signOut } from "next-auth/client";
import connectMetamask from "../../../lib/connectMetamask";
import mixpanel from "mixpanel-browser";

const MetamaskButton2 = (props: { session; setLoading; isMobile: boolean }) => {
  const { session, setLoading } = props;

  const ocm = () => {
    mixpanel.track("Sign In");
    connectMetamask(setLoading, props.isMobile);
  };
  const ocm2 = () => {
    mixpanel.track("Sign Out");
    signOut();
  };

  return (
    <div className={s.signin}>
      {!session ? (
        <div className={s.button} onClick={ocm}>
          {"SIGN IN"}
        </div>
      ) : (
        <div className={s.button} onClick={ocm2}>
          {"SIGN OUT"}
        </div>
      )}
    </div>
  );
};

export default MetamaskButton2;
