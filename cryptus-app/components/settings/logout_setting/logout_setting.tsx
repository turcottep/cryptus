import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/client";
import s from "./logout_setting.module.scss";



export default function LogoutSetting() {
    return (
      <div className={s.container}>
        <div className={s.settingCol}>
          Log out
          <img 
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl: `${window.location.hostname}`,
              });
            }}
            className={s.icon}
            src="/icons/logout_icon.png" />
        </div>
    </div>
        
  );
}