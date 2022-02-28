// net_worth_number et net_worth_delta seront des arrow function components ici.
//react and css
import React, { useState, useEffect } from "react";
import s from "./net_worth.module.scss";

//external exports
import { getUSDFromETH } from "../../../lib/convertCurrency";

//internal imports
import CadEthExchangeButton from "./cad_eth_exchange_button/cad_eth_exchange_button";
import TimeInterval, { intervals } from "./time_interval/time_interval";

// Code  net_worth_number, net_worth_delta
type net_worth_props = {
  EthCad: number;
  active: intervals;
  value: string;
  delta: string;
  callbackGraph: any;
};

export default function NetWorth(props: net_worth_props) {
  const [price, setPrice] = useState(props.EthCad);
  const callbackPriceSwitch = async (childData) => {
    console.log("old price ", childData);
    let newPrice = await getUSDFromETH(childData);
    setPrice(newPrice);
    console.log("new price !", newPrice);
  };

  return (
    <div className={s.container}>
      <div className={s.value}>{props.value}</div>
      <div className={s.container_row}>
        <div className={s.arrowdown}> </div>
        <div className={s.delta}>{props.delta}</div>
      </div>
      {/* <CadEthExchangeButton
        EthCad={props.EthCad}
        callback={callbackPriceSwitch}
      /> */}
      <TimeInterval active={props.active} callback={props.callbackGraph} />
    </div>
  );
}
