import { useRouter } from "next/router";
import React from "react";
import PhoneNavbar from "../components/PhoneNavbar";

export default function post(props) {
  const router = useRouter();
  console.log(router, "routes");
  return (
    <div className="bg-instagram h-screen">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <PhoneNavbar />
          <div className="flex flex-col mt-28">
            <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-4">
              <button
                className="text-xl text-center whitespace-nowrap bg-white text-brown border-4 border-brown rounded-lg w-full px-4 py-8"
              >
                Metamask
              </button>
            </div>
            <div className="mt-32 grid grid-cols-7 justify-center text-center">
              <div className="col-start-2 col-span-2 divide-y divide-black">
                <div><text>&emsp;</text></div>
                <div><text>&emsp;</text></div>
              </div>
              <div className="col-start-4 col-span-1 m-auto">
                <text className="toggleColour text-2xl text-black no-underline hover:no-underline">
                  OR
                </text>
              </div>
              <div className="col-start-5 col-span-2 divide-y divide-black">
                <div><text>&emsp;</text></div>
                <div><text>&emsp;</text></div>
              </div>
            </div>
            <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-4">
              <button
                className="text-xl text-center whitespace-nowrap bg-white text-brown border border-brown rounded-lg w-full px-2 py-2"
              >
                I don't have a wallet
              </button>
            </div>
            {/* I tried making it stick to the bottom, but failed */}
            <div className="text-center pt-64"> 
              <a className="toggleColour text-black no-underline hover:no-underline">
                  Have an account? Log in
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}