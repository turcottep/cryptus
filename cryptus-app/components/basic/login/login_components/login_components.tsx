import React, { useState, useEffect } from "react";
import s from "./login_components.module.scss";

import { signIn } from "next-auth/react";
import Link from "next/link";

import FindUserIdFromWalletAdress from "../../../../lib/findUserIdFromWalletAdress";
import CreateAccountFromWalletAddress from "../../../../lib/createAccountFromWalletAddress";
import FindUserFromUserId from "../../../../lib/findUserFromUserId";

declare let window: any; //this fixes the window.ethereum errir, but I think it does nothing in the back

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  CancelMetamask: "Metamask sign-in error.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: "Wrong username/password combination",
  default: "Unable to sign in.",
};

function Or() {
  return (
    <div className="mt-4 grid grid-cols-7 justify-center text-center">
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
  );
}

function LoginButton(props) {
  return (
    <div className="flex xl:text-xl flex-col mx-12 mt-8">
      <div className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2">
        {props.children}
      </div>
    </div>
  );
}

function ForgotPasswordButton() {
  return (
    <div className="flex flex-col items-center">
      <a className="toggleColour mt-4 text-black no-underline hover:no-underline">
        Forgot your Password?
      </a>
    </div>
  );
}

function SignupButton() {
  return (
    <Link href="/signup">
      <div className="flex xl:text-xl flex-col mx-12 mt-4  text-center whitespace-nowrap bg-white border border-brown rounded-lg px-2 py-2">
        <button className="text-brown text-center text-xl font-bold">
          Sign up
        </button>
      </div>
    </Link>
  );
}

function MetamaskButton(props) {
  const { router } = props;
  const onMetamaskClick = async () => {
    router.push("login?");
    this.setState({ loading: true });
    // if (!window.ethereum) {
    //   console.log("please donwload MetaMask");
    //   window.open("https://metamask.io/", "_blank").focus();
    //   this.setState({ loading: false });
    // } else {
    try {
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const wallet_address = accounts[0];

      const userId = await FindUserIdFromWalletAdress(wallet_address, false);

      if (!userId) {
        //Create Account with this wallet address
        const user = await CreateAccountFromWalletAddress(
          wallet_address,
          false
        );
        router.push("signup?step=3");
      } else {
        const user = await FindUserFromUserId(userId, false, false);
        signIn("credentials", {
          redirect: true,
          address: wallet_address,
          callbackUrl: `${window.location.origin}/` + user.username,
        });
      }
    } catch (error) {
      // console.error(error);
      this.setState({ loading: false });
      router.push("login?error=CancelMetamask");
    }
    // }
  };

  return (
    <div className="mx-12">
      <button
        onClick={() => onMetamaskClick}
        className="text-xl text-center bg-white text-brown border-4 border-brown rounded-lg w-full px-4 py-8 mt-20"
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
    </div>
  );
}

export {
  errors,
  Or,
  LoginButton,
  ForgotPasswordButton,
  SignupButton,
  MetamaskButton,
};
