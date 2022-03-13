import { any } from "cypress/types/bluebird";
import React, { useState, useEffect } from "react";
import s from "./wallet_list_display.module.scss";
import { walletsType } from "../wallet_manager";


export default function WalletListDisplay(props: { wallets: walletsType[] }) {
  const wallets = props.wallets.map((wallet, i)=>(
      <div>
          {wallet.address}
      </div>
  ))
  return (
      <ul>
          {wallets}
      </ul>
  )
}