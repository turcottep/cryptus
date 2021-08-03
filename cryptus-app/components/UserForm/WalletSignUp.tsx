import React, { Component } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import FormHeader from "./FormHeader";
import { FormValuesProps } from "./UserForm";

declare let window: any;

const errors = {
  UniqueEmail: "This email is already in use!",
  default: "Unable to connect wallet.",
};

type MyState = { error: String };

export default class WalletSignUp extends Component<FormValuesProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { error: "" };
    this.handleErrorEmail = this.handleErrorEmail.bind(this);
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleErrorEmail() {
    const error = String(this.state.error);
    const errorMessage = error && (errors[error] ?? errors.default);

    return error ? errorMessage : null;
  }

  handleClick = async () => {
    if (!(window as any).ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }

    await (window as any).ethereum.enable();

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];

    const publicAddress = account.toLowerCase(); //coinbase.toLowerCase();

    this.props.changeState("blockchain_wallet", publicAddress);

    try {
      this.props.changeState("loading", true);

      const res = updateWallet(this.props.values.email, publicAddress).then(
        (res) => {
          this.props.changeState("loading", false);

          if (res.status == 202) {
            alert("Wallet already in use, try loggin in");
            this.setState({ error: "UniqueWallet" });
          } else {
            this.props.nextStep();
          }
        }
      );
    } catch (error) {
      alert("Please accept the terms and conditions");
    }
  };

  render() {
    return (
      <div className="flex xl:text-xl flex-col mx-12 ">
        <FormHeader title="Connect Wallet" step={this.props.step} />

        <button
          onClick={this.handleClick}
          className="text-xl text-center whitespace-nowrap bg-white text-brown border-4 border-brown rounded-lg w-full px-4 py-8 mt-20"
        >
          <div className="flex justify-between items-center">
            <img
              className="flex-shrink w-12 h-12"
              src="../MetaMask_Fox.svg"
              alt="MetaMask Fox Logo"
            />
            <span>Metamask</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </button>
        <div className="flex xl:text-xl flex-col items-center w-full mt-48">
          <div className="flex w-full flex-col">
            <div className=" w-full grid grid-cols-7 justify-center text-center">
              <div className="col-start-2 col-span-2 divide-y divide-black">
                <div>
                  <span>&emsp;</span>
                </div>
                <div>
                  <span>&emsp;</span>
                </div>
              </div>
              <div className="col-start-4 col-span-1 m-auto">
                <span className="toggleColour text-2xl text-black no-underline hover:no-underline">
                  OR
                </span>
              </div>
              <div className="col-start-5 col-span-2 divide-y divide-black">
                <div>
                  <span>&emsp;</span>
                </div>
                <div>
                  <span>&emsp;</span>
                </div>
              </div>
            </div>
            <button
              onClick={this.continue}
              className="text-xl text-center whitespace-nowrap bg-white text-brown border border-brown rounded-lg w-full px-2 py-2"
            >
              I don't have a wallet
            </button>
          </div>
        </div>
      </div>
    );
  }
}

async function updateWallet(email, blockchain_wallet) {
  const response = await fetch("api/leads/updateWallet", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      blockchain_wallet: blockchain_wallet,
      external_url:
        "https://api.opensea.io/api/v1/assets?owner=" +
        blockchain_wallet +
        "&order_direction=asc&offset=0&limit=50",
      blockchain_id: "ETH",
    }),
  });
  return response;
}
