import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavbarLandingPage() {
  const [session, loading] = useSession();

  return (
    <div id="header" className=" w-full top-0 text-black bg-instagram">
      <div className="w-full flex flex-col justify-center h-full py-2  md:py-4">
        <div className="flex w-full justify-between items-center md:items-end py-4 px-4">
          <img
            className="w-24 h-24 rounded-full border-black border-2 mx-2"
            src="./icons/icon-192x192.png"
            alt="icon"
          />
          <div className="flex w-full h-full justify-between flex-col px-4">
            <span className="toggleColour text-left align-top text-gray-700 font-semibold text-4xl lg:text-2xl pb-1 pl-4">
              Lafleur
            </span>
            <div className="flex w-full justify-around flex-row text-center">
              <div className="flex-col ">
                <span className="font-bold">3</span>
                <br />
                <span>NFTs</span>
              </div>
              <div className="flex-col">
                <span className="font-semibold">44</span>
                <br />
                <span>Likes</span>
              </div>
              <div className="flex-col">
                <span className="font-bold">1.5K</span>
                <br />
                <span>Views</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-gray-700 pt-4 pb-2 font-bold text-xl lg:text-2xl px-4">
          Alexandre Lafleur
        </div>
        <div className="w-full px-4 pb-2">
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book
        </div>
      </div>
    </div>
  );
}
