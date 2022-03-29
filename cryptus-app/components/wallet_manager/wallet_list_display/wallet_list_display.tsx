import { any } from "cypress/types/bluebird";
import React, { useState, useEffect } from "react";
import s from "./wallet_list_display.module.scss";
import { walletsType } from "../wallet_manager";
import AddWalletWithCurrentAddress from "../../../lib/addWalletWithCurrentAddress";
import DeleteWalletWithCurrentAddress from "../../../lib/deleteWalletWithCurrentAddress";

export default function WalletListDisplay(props: {
  callback: any;
  currentAddress: string;
  addresses: Array<string>;
  added: boolean;
}) {
  const wallets = props.addresses.map((address, i) => (
    <div className={s.wallet}>
      <div className={s.walletInfos}>
        <div className={s.rowCurrency}>
          Metamask
          <img src="/images/metamask_logo.png" className={s.walletIcon} />
        </div>
        <div>{address}</div>
      </div>
      <div className={s.add}>
        {!props.added ? (
          <img
            onClick={async () => {
              await addWallet(props.currentAddress, address).then(
                props.callback(address, true)
              );
            }}
            src="/icons/add_icon.png"
            className={s.walletIcon}
          />
        ) : props.addresses.length > 1 ? (
          <img
            onClick={async () => {
              await deleteWallet(props.currentAddress, address).then(
                props.callback(address, false)
              );
            }}
            src="/icons/delete_icon.png"
            className={s.walletIcon}
          />
        ) : (
          <img src="/icons/delete_icon.png" className={s.walletIconDisabled} />
        )}
      </div>
    </div>
  ));
  return (
    <div className={s.walletList}>
      <ul className={props.added ? s.containerAdded : s.container}>
        {wallets}
      </ul>
    </div>
  );
}

const addWallet = async (currentAddress: string, address: string) => {
  AddWalletWithCurrentAddress(currentAddress, address, false);
};

const deleteWallet = async (currentAddress: string, address: string) => {
  DeleteWalletWithCurrentAddress(currentAddress, address, false);
};
