import React, { useState, useEffect } from "react";
import s from "./nft_header.module.scss";

import { useRouter } from "next/router";

import BackButton from "../../../../basic/header/back_button/back_button";
import ContextualMenuButton from "../../../../basic/header/contextual_menu_button/contextual_menu_button";

export default function NftHeader() {
  //const router = useRouter();
  //const { userId, collectionId, nftId } = router.query;

  return (
    <div className={s.container}>
      <div className={s.box}>
        <BackButton />
        <ContextualMenuButton img="/icons/more_icon.png" />
      </div>
    </div>
  );
}
