import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function PhoneNavbar() {
  const [session, loading] = useSession();

  return (
    <div id="header" className="w-full top-0 text-black bg-coquille">
      <div className="w-full h-full py-2">
        <div className="grid grid-cols-6 justify-center">
          <div className="col-start-1 col-span-1">
            <a
              className="toggleColour text-black no-underline hover:no-underline font-bold text-3xl ml-4"
              href="#"
            >
              &lt;
            </a>
          </div>
          <div className="col-start-2 col-span-4 text-center m-auto">
            <a
              className="toggleColour text-black no-underline hover:no-underline font-bold text-xl"
              href="#"
            >
              O Public Wallet
            </a>
          </div>
        </div>
      </div>
      {/* <hr className="border-b border-red-400 opacity-25 my-0 py-0" /> */}
    </div>
  );
}
