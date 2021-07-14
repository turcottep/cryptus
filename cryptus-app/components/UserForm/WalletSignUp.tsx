import React, { Component } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import FormHeader from "./FormHeader";
import { FormValuesProps } from "./UserForm";

export default class WalletSignUp extends Component<FormValuesProps> {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <div className="flex xl:text-xl flex-col lg:flex-row mx-12 ">
        <FormHeader title="Connect Wallet" step={this.props.step} />

        <div
          // onClick={this.continue}
          className="relative text-xl text-center whitespace-nowrap bg-white text-brown border-4 border-brown rounded-lg w-full px-4 py-8 mt-20"
        >
          <div className="absolute bg-black w-full h-24 self-center bg-opacity-80 rounded-lg -ml-6 -mt-10 "></div>
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
        </div>
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
