import React, { useState, useEffect } from "react";
import s from "./wallet_manager.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

//import ContextualXButton from "../header/contextual_x_button/contextual_x_button";
import BackButton from "../header/back_button/back_button";
import WalletListDisplay from "./wallet_list_display/wallet_list_display";

export type walletsType = {
  id: string;
  blockchain_id: string;
  address: string;
  external_url: string;
  userId: string;
};

export default function WalletManager(props: { user: any }) {
  const { user } = props;
  const addresses = [];
  // console.log(user.wallets);
  for (const [key, value] of Object.entries(user.wallets)) {
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
          console.log("Already added", addresses);
          addressesToAdd = addressesToAdd.filter(
            (val) => !addresses.includes(val)
          );
          setWalletToAdd(addressesToAdd);
        } catch (error) {
          console.log(error);
          setWalletToAdd([]);
        }
      }
    };
    addMetamaskWallet();
  }, [event]);

  return (
    <div className={s.container}>
      <WalletManagerHeader />
      <WalletListDisplay
        addOrDeleteAddressEvent={setEvent}
        currentAddress={walletList[0]}
        addresses={walletList}
        added={true}
      />
      <div className={s.line} />
      <WalletListDisplay
        addOrDeleteAddressEvent={setEvent}
        currentAddress={walletList[0]}
        addresses={walletToAdd}
        added={false}
      />
    </div>
  );
}

const WalletManagerHeader = () => (
  <div className={s.header}>
    <BackButton />
    <div className={s.settingsTitle}>Wallet Manager</div>

    <div className={s.blankButton} />
  </div>
);

// const AddWallet = () => (
//   <div className={s.addWallet} onClick={addMetamaskWallet}>
//     <img className={s.addIcon} src="/icons/add_icon.png" />
//   </div>
// );

declare let window: any;
