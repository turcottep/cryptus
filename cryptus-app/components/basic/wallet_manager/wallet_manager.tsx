import React, { useState, useEffect } from "react";
import s from "./wallet_manager.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

//import ContextualXButton from "../header/contextual_x_button/contextual_x_button";
import BackButton from "../header/back_button/back_button";
import WalletListDisplay from "./wallet_list_display/wallet_list_display";
import Address from "../../../pages/api/scripts/rarity_floor/[address]";
import Card from "../../utils/card/card";

export type walletsType = {
  id: string;
  blockchain_id: string;
  address: string;
  external_url: string;
  userId: string;
};

export default function WalletManager(props: {
  user: any;
  callback_close_wallet;
  isMobile: boolean;
}) {
  const wallets = props.user.wallets;
  const addresses = [];
  for (const [key, value] of Object.entries(wallets)) {
    addresses.push(value["address"]);
  }
  const [session, status] = useSession();
  const [walletList, setWalletList] = useState(addresses);
  const [walletToAdd, setWalletToAdd] = useState([]);
  const [event, setEvent] = useState();

  useEffect(() => {
    addMetamaskWallet();
  }, [event, props]);

  const addMetamaskWallet = async () => {
    console.log("update view");
    if (!window.ethereum) {
      window.open("https://metamask.io/", "_blank").focus();
      setWalletToAdd([]);
    } else {
      try {
        await window.ethereum.enable();
        let addressesToAdd = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        addressesToAdd = addressesToAdd.filter(
          (val) => !addresses.includes(val)
        );
        setWalletList(addresses);
        setWalletToAdd(addressesToAdd);
      } catch (error) {
        console.log(error);
        setWalletList([]);
        setWalletToAdd([]);
      }
    }
  };

  const callbackFunction = async (address, adding: boolean) => {
    let newWalletList = walletList;
    let newWalletToAdd = walletToAdd;
    if (adding) {
      newWalletList.push(address);
      newWalletToAdd = newWalletToAdd.filter((val) => val != address);
    } else {
      newWalletList = newWalletList.filter((val) => val != address);
      newWalletToAdd.push(address);
    }
    setWalletList(newWalletList);
    setWalletToAdd(newWalletToAdd);
  };

  return (
    <Card
      callback_close={props.callback_close_wallet}
      isMobile={props.isMobile}
    >
      <div className={s.walletList}>
        <WalletListDisplay
          callback={callbackFunction}
          currentAddress={walletList[0]}
          addresses={walletList}
          added={true}
        />
      </div>
      <div className={s.line} />
      <WalletListDisplay
        callback={callbackFunction}
        currentAddress={walletList[0]}
        addresses={walletToAdd}
        added={false}
      />
    </Card>
  );
}

declare let window: any;
