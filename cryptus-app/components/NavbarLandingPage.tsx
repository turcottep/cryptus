import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

export default function NavbarLandingPage() {
  const [session, loading] = useSession();

  return (
    <div id="header" className=" w-full top-0 text-black bg-coquille">
      <div className="w-full flex flex-wrap justify-center md:justify-end h-full py-2 md:py-4">
        <div className="w-full flex items-center justify-around md:items-end">
          <Link href="/">
            <a className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl">
              Public Wallet
            </a>
          </Link>
          {session ? (
            <>
              <button
                className="bg-dirt text-white px-2 py-1 rounded-full"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-dirt text-white px-2 py-1 font-bold rounded-full"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
