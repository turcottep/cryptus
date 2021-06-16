import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

export default function Mosaic() {
  const [session, loading] = useSession();

  return (
    <div id="header" className=" w-full h-full text-black bg-instagram">
      <Link href="/lafleur/feed">
        <div className="h-full grid grid-cols-3 gap-0">
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT1.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT2.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT3.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT4.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT5.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT6.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT7.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT2.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT3.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT4.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT2.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT3.svg"
            />
          </div>
          <div className="">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              src="NFT4.svg"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
