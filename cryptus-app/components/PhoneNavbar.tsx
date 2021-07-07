import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function PhoneNavbar() {
  const [session, loading] = useSession();

  return (
    <div id="header" className="w-full top-0 text-black bg-coquille">
      <div className="w-full h-full py-2">
        <div className="grid grid-cols-2 justify-center" >
            <div className="col-start-1 col-span-1">
                <a
                    className="align-middle toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl"
                    href="#"
                >
                Public Wallet
                </a>
          </div>
          <div className="col-start-2 col-span-1 ">
              <div className="float-right w-full">
              <button
                type="submit"
                className="submit 2xl:text-xl text-center bg-black text-white font-bold rounded-lg w-3/6 float-right py-2"
                >
                Sign up
            </button>
              </div>
          </div>
        </div>
      </div>
      {/* <hr className="border-b border-red-400 opacity-25 my-0 py-0" /> */}
    </div>
  );
}