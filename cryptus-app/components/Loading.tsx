import React from "react";

export default function Loading() {
  return (
    <div
      id="header"
      className="w-full h-full flex justify-around items-center bg-opacity-80 bg-black"
    >
      <div className="flex flex-col">
        <img
          className="rounded-full border-2 bg-white border-black w-24 h-24"
          src="../icons/icon-192x192.png"
          alt="PublicWallet Icon"
        />
        <span className=" text-white text-2xl font-bold">Loading ...</span>
      </div>
    </div>
  );
}
