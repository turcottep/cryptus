import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavbarLandingPage() {
  const [session, loading] = useSession();

  return (
    <div id="header" className=" w-full top-0 text-black bg-coquille">
      <div className="w-full flex flex-wrap justify-center md:justify-end h-full py-2 md:py-4">
        <div className="flex items-center md:items-end">
          <a
            className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl"
            href=""
          >
            Public Wallet
          </a>
          <button onClick={() => findWalletByUsername()}>BUTTOONNN</button>
        </div>
      </div>
    </div>
  );
}
// onClick={() => signIn()} a garder TODO pour nextAuth
async function findWalletByUsername(){
  const username = "Alice"

  const response = await fetch('/api/users/' + username);
  const data = await response.json();
  console.log(data);
}
