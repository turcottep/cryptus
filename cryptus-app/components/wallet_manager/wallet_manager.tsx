import React, { useState, useEffect } from "react";
import s from "./wallet_manager.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

//import ContextualXButton from "../header/contextual_x_button/contextual_x_button";
import BackButton from "../header/back_button/back_button";
import WalletListDisplay from "./wallet_list_display/wallet_list_display"

export type walletsType = {
  id: string;
  blockchain_id: string;
  address: string;
  external_url: string;
  userId: string;
};

export default function WalletManager(props: {
  user: any;
}) {
  const { user } = props;
  const [session, status] = useSession();
  const [ walletList, setWalletList ] = useState(user.wallets)

  return (
    <div className={s.container}>
      <WalletManagerHeader />
      <WalletListDisplay wallets={walletList}/>
        
    </div>
  );
}

const WalletManagerHeader = () => (
    <div className={s.header}>
      <BackButton />
      <div className={s.settingsTitle}>
        Wallet Manager
      </div>
      
      <div className={s.blankButton}/>
    </div>
  );