import React, { useState, useEffect } from "react";
import s from "./account_link.module.scss";


export default function AccountLink(props: { username: string }) {
    const account_link = "publicwallet.app/" + props.username
    return (
    <div className={s.container}>
        <div className={s.title}>
            Account link
        </div>
        <div className={s.settingCol}>
            {account_link}
            <a onClick={() => navigator.clipboard.writeText(account_link)} target="_blank">
                <img className={s.icon} src="/icons/copy_icon.png" />
            </a>
        </div>
    </div>
  );
}