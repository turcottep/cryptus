import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Feed() {
  const [session, loading] = useSession();

  return (
    <div id="header" className=" w-full h-full text-black bg-instagram">
      <div className="flex items-center py-2 px-1">
        <img
          className="w-10 h-10 rounded-full  mx-2"
          src="../icons/icon-192x192.png"
          alt="icon"
        />
        <span className="text-center text-gray-700 font-semibold text-3xl lg:text-2xl">
          Lafleur
        </span>
      </div>

      <div className="h-full flex justify-between flex-col">
        <div className="">
          <img
            className="w-full flex-1 min-w-0 min-h-0"
            draggable="false"
            src="../NFT5.svg"
          />
        </div>
        <div className="flex flex-col text-gray-700 px-2">
          <div className="flex items-center pt-2">
            <span className="text-xl font-bold pr-6">Bullish Bull</span>
            <div className="flex items-center">
              <img
                className="h-4 w-4 pr-1"
                draggable="false"
                src="../eth_logo.png"
              />
              <span>4 ETH</span>
            </div>
          </div>
          <span className="py-1 font-bold text-gray-500">VeeFriends</span>
          <span>
            This token is verifiable for admission to VeeCon 2022, 2023, 2024
            This token is a collectible that lives on the Ethereum blockchain A
            Gary Vaynerchuk NFT project around meaningful intellectual property
            and an extraordinary community.
          </span>

          <br />
        </div>
        <div className="">
          <img
            className="w-full flex-1 min-w-0 min-h-0"
            draggable="false"
            src="../NFT2.svg"
          />
        </div>
        <div className="">
          <img
            className="w-full flex-1 min-w-0 min-h-0"
            draggable="false"
            src="../NFT3.svg"
          />
        </div>
        <div className="">
          <img
            className="w-full flex-1 min-w-0 min-h-0"
            draggable="false"
            src="../NFT4.svg"
          />
        </div>
        <div className="">
          <img
            className="w-full flex-1 min-w-0 min-h-0"
            draggable="false"
            src="../NFT5.svg"
          />
        </div>
        <div className="">
          <img
            className="w-full flex-1 min-w-0 min-h-0"
            draggable="false"
            src="../NFT6.svg"
          />
        </div>
        <div className="">
          <img
            className="w-full flex-1 min-w-0 min-h-0"
            draggable="false"
            src="../NFT7.svg"
          />
        </div>{" "}
      </div>
    </div>
  );
}
