import React, { useState } from "react";
import NameForm from "./name_form";
import NavbarLandingPage from "../navbars/navbar_landing_page/navbar_landing_page";
import { signIn } from "next-auth/client";
import FindUserIdFromWalletAdress from "../../lib/findUserIdFromWalletAdress";
import CreateAccountFromWalletAddress from "../../lib/createAccountFromWalletAddress";
import FindUserFromUserId from "../../lib/findUserFromUserId";
import Loading from "../utils/loading/loading";

export default function LandingPage() {
  const [loading, setLoading] = useState<Boolean>(false);

  const connectMetamask = async () => {
    // router.push("login?");
    setLoading(true);
    if (!window.ethereum) {
      console.log("please donwload MetaMask");
      window.open("https://metamask.io/", "_blank").focus();
      setLoading(false);
    } else {
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
          signIn("credentials", {
            redirect: true,
            address: wallet_address,
            callbackUrl: `${window.location.origin}/edit_profile`,
          });
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
        setLoading(false);
        // router.push("login?error=CancelMetamask");
      }
    }
  };

  return (
    <div className="h-screen relative bg-coquille w-full">
      {loading && <Loading />}
      <div className="h-screen justify-between px-3 md:px-10 2xl:px-20 md:mx-auto flex flex-col items-center">
        <NavbarLandingPage callback={connectMetamask} />

        <div className="flex h-full justify-evenly md:justify-between flex-col w-full items-center md:flex-row">
          <div className="flex justify-between flex-col w-full md:justify-around items-center text-center md:h-full my-4">
            <div className="flex-shrink w-auto md:w-full">
              <h1 className="mx-auto h-auto">
                <img
                  draggable="false"
                  alt="Title:Express Yourself"
                  className="w-full"
                  src="title.svg"
                />
              </h1>
            </div>
            <div className="text-center">
              <p className="md:block leading-normal text-gray-600 text-2xl md:text-3xl xl:text-3xl ">
                <span> The quickest way to show</span>
                <br />
                <span>your NFTs</span>
              </p>
            </div>
            <div className="invisible w-full md:visible md:w-1/2 lg:w-4/5 my-4">
              <button
                onClick={() => connectMetamask()}
                className="submit md:px-4 2xl:text-xl text-center whitespace-nowrap bg-dirt text-white font-bold rounded-xl lg:rounded-l-none lg:rounded-r-xl w-full lg:w-2/5 px-2 py-2"
              >
                Get Started!
              </button>
            </div>
          </div>
          <div className="flex-shrink w-auto md:w-full min-w-0 min-h-0">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              alt="Guide showing statue to visitors"
              src="museum.svg"
            />
          </div>
        </div>
        <div className="md:hidden w-full sm:mx-0 md:w-2/5 lg:w-2/5 my-4">
          {/* <NameForm /> */}
          <button
            onClick={() => connectMetamask()}
            className="submit md:px-4 2xl:text-xl text-center whitespace-nowrap bg-dirt text-white font-bold rounded-xl lg:rounded-l-none lg:rounded-r-xl w-full lg:w-2/5 px-2 py-2"
          >
            Get Started!
          </button>
        </div>
      </div>
    </div>
  );
}
declare let window: any;
