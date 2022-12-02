import React, { useEffect, useState } from "react";
import Card from "../../utils/card/card";
import s from "./support.module.scss";

export default function Support(props: {
  callback_close_support;
  isMobile: boolean;
}) {
  return (
    <Card
      callback_close={props.callback_close_support}
      isMobile={props.isMobile}
    >
      <div className={s.header}>Contact Us</div>
      <div className={s.text}>
        We are now in developpement of PublicWallet.app! Please contact us to
        give feedback or if you have an issue with our App!
      </div>
      <div className={s.contactsMethod}>
        <div>
          Twitter
          <a
            href="https://twitter.com/public_wallet"
            target="_blank"
            rel="noopener noreferrer"
            className={s.row}
          >
            twitter.com/public_wallet
            <div className={s.iconDiv}>
              <img className={s.icon} src="/icons/link_icon.png" />
            </div>
          </a>
        </div>
        <div>
          Email
          <div
            className={s.row}
            onClick={() =>
              navigator.clipboard.writeText("publicwallet.app@gmail.com")
            }
          >
            publicwallet.app@gmail.com
            <div className={s.iconDiv}>
              <img className={s.icon} src="/icons/copy_icon.png" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
