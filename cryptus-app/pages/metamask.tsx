import React, { Component } from "react";
import Head from "next/head";
// import web3 from "web3";
var Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
var Personal = require("web3-eth-personal");
// "Personal.providers.givenProvider" will be set if in an Ethereum supported browser.
var personal = new Personal(
  Personal.givenProvider || "ws://some.local-or-remote.node:8546"
);
declare let window: any;

export default class Welcome extends React.Component {
  state = {
    accountAddress: "",
  };

  async componentDidMount() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    console.log(accounts);

    // this.setState({
    //   accountAddress: accounts[0],
    // });
  }

  render() {
    return (
      <div>
        {/* NAVBAR */}
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a href="#" className="navbar-brand">
                HODL
              </a>
            </div>

            {/* NAVBAR ITEMS */}
            <ul className="nav navbar-nav navbar-right">
              <li className="navbar-brand">{this.state.accountAddress}</li>
            </ul>
          </div>
        </nav>
        <div>
          <div className="container">
            <h1>Welcome, Ethereum Devs!</h1>
            <p>
              As a community we need to start building new and powerful
              applications that truly add value.
            </p>
            <p>
              <a href="https://www.coindesk.com/dont-hodl-buidl-blockchain-tech-will-add-value-2018">
                <button className="bg-brown px-2 text-white py-2 rounded-lg">
                  Learn more
                </button>
              </a>
            </p>
          </div>
        </div>
        ;
      </div>
    );
  }
}
