// net_worth_number et net_worth_delta seront des arrow function components ici.
//react and css
import React, { useState, useEffect } from "react";
import s from "./net_worth.module.scss";

//external exports

//internal imports
import CadEthExchangeButton from "./cad_eth_exchange_button/cad_eth_exchange_button";
import TimeInterval from "./time_interval/time_interval";

// Code  net_worth_number, net_worth_delta

type net_worth_props = {
  EthCad: number;
  active: string;
  value: string;
  delta: string;
};

export default function NetWorth(props: net_worth_props) {
  return (
    <div className={s.container}>
      <div className={s.value}>{props.value}</div>
      <div className={s.container_row}>
        <div className={s.arrowdown}> </div>
        <div className={s.delta}>{props.delta}</div>
      </div>

      <CadEthExchangeButton EthCad={props.EthCad} />
      <TimeInterval active={props.active} />
    </div>
  );
}
