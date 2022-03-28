import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/client";
import s from "./wallet_manager_setting.module.scss";
import router from "next/router";

export default function WalletManagerSetting() {
  return (
    <div className={s.container}>
      <div className={s.settingCol}>
        Wallet Manager
        <div className={s.iconDiv}>
          <img
            onClick={() => {
              router.push("./walletmanager");
            }}
            className={s.icon}
            src="/icons/wallet_manager_icon.png"
          />
        </div>
      </div>
    </div>
  );
}
