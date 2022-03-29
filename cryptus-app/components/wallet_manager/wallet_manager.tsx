import React, { useState, useEffect } from "react";
import s from "./wallet_manager.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

//import ContextualXButton from "../header/contextual_x_button/contextual_x_button";
import BackButton from "../header/back_button/back_button";
import WalletListDisplay from "./wallet_list_display/wallet_list_display";
import Address from "../../pages/api/scripts/rarity_floor/[address]";

export type walletsType = {
  id: string;
  blockchain_id: string;
  address: string;
  external_url: string;
  userId: string;
};

export default function WalletManager(props: { wallets: any }) {
  const { wallets } = props;
  const addresses = [];
  console.log(props);
  // console.log(user.wallets);
  for (const [key, value] of Object.entries(wallets)) {
    addresses.push(value["address"]);
  }
  // user.wallets.foreach((wallet) => {
  //   addresses.push(wallet.address);
  // });
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
        console.log("To add", addressesToAdd);
        console.log("Already added", walletList);
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
    <div className={s.container}>
      <WalletManagerHeader />
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
    </div>
  );
}

const WalletManagerHeader = () => (
  <div className={s.header}>
    <div className={s.backButton}>
      <BackButton
        callback_close={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
    <div className={s.settingsTitle}>Wallet Manager</div>

    <div className={s.blankButton} />
  </div>
);

declare let window: any;
