import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/client";
import s from "./wallet_manager_setting.module.scss";
import router from "next/router";
import { props } from "cypress/types/bluebird";

export default function WalletManagerSetting(props: {
  open_wallet_manager: () => void;
}) {
  const onWalletManagerClick = () => {
    props.open_wallet_manager();
  };

  return (
    <div className={s.container}>
      <div className={s.settingCol}>
        Wallet Manager
        <div className={s.iconDiv}>
          <img
            onClick={onWalletManagerClick}
            className={s.icon}
            src="/icons/wallet_manager_icon.png"
          />
        </div>
      </div>
    </div>
  );
}
