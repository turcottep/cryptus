import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavbarProfile() {
  const [session, loading] = useSession();

  return (
    <div id="header" className="fixed w-full top-0 text-black bg-instagram">
      <div className="w-full flex items-center flex-row justify-between h-full px-4 py-2 md:py-4 border-b-2 border-black">
        <a
          className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl"
          href="/"
        >
          Public Wallet
        </a>
        <button className="w-40 md:px-4 2xl:text-xl text-center whitespace-nowrap bg-dirt text-white font-bold rounded-xl lg:w-2/5 px-2 py-2">
          Get Early Access
        </button>
      </div>
    </div>
  );
}
