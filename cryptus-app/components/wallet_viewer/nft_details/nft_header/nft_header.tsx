import React, { useState, useEffect } from "react";
import s from "./nft_header.module.scss";

import { useRouter } from "next/router";

import BackButton from "../../../header/back_button/back_button";
import ContextualMenuButton from "../../../header/contextual_menu_button/contextual_menu_button";

export default function NftHeader() {
  //const router = useRouter();
  //const { userId, collectionId, nftId } = router.query;

  return (
    <div className={s.container}>
      <div className={s.box}>
        <BackButton
          callback_close={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <ContextualMenuButton img="/icons/more_icon.png" />
      </div>
    </div>
  );
}
