import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function NavbarProfile() {
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <div
      id="header"
      className="fixed w-full top-0 text-black bg-instagram mx-auto"
    >
      <div className="w-full flex items-center flex-row justify-between h-full px-4 py-2 border-b border-gray-400">
        <a
          className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-lg"
          href="/"
        >
          Public Wallet
        </a>
        <button className=" text-sm text-center whitespace-nowrap bg-dirt text-white font-bold rounded-md  px-2 py-1">
          Get Early Access
        </button>
      </div>
      <div className="flex justify-between bg-instagram w-full border-b border-gray-400 py-2 px-2">
        <div id="backButton" className="" onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <span className="font-bold">Lafleur</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </div>
  );
}
