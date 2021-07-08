import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Navbar() {
  const [session, loading] = useSession();

  return (
    <div id="header" className=" w-full top-0 text-black bg-coquille">
      <div className="w-full flex flex-wrap justify-center md:justify-end h-full py-2 md:py-4">
        <div className="flex items-center md:items-end">
          <a
            className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl"
            href="#"
          >
            {/* <Link href="/">Salsa</Link> */}
            Public Wallet
          </a>
          {/* <img
            className="w-4 h-4 mx-2"
            src="./icons/icon-192x192.png"
            alt="icon"
          /> */}
          <button onClick={() => signIn()}
                  type="submit"
                  className="submit mt-12 md:px-4 2xl:text-xl text-center whitespace-nowrap bg-black text-white font-bold rounded-lg w-full lg:w-2/5 px-2 py-2"
                  >
                  Login
                </button>
        </div>
      </div>
      {/* <hr className="border-b border-red-400 opacity-25 my-0 py-0" /> */}
    </div>
  );
}
