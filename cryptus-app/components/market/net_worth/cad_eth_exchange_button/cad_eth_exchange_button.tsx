//react and css
import React, { useState, useEffect } from "react";
import s from "./cad_eth_exchange_button.module.scss";

//external exports

//internal imports

export default function CadEthExchangeButton(props: {
  EthCad: number;
  callback: any;
}) {
  return (
    <div className={s.container}>
      <div className={s.button} onClick={props.callback}>
        Switch
      </div>
    </div>
  );
}
