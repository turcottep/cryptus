import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function WalletSignUp() {
  const [session, loading] = useSession();
  const router = useRouter();
  return (
    <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-20">
      <button className="text-xl text-center whitespace-nowrap bg-white text-brown border-4 border-brown rounded-lg w-full px-4 py-8">
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
