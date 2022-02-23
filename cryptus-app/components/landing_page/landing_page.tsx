import React from "react";
import NameForm from "./name_form";
import NavbarLandingPage from "../navbars/navbar_landing_page/navbar_landing_page";
import { signIn } from "next-auth/client";

export default function LandingPage() {
  return (
    <div className="h-screen relative bg-coquille w-full">
      <div className="h-screen justify-between px-3 md:px-10 2xl:px-20 md:mx-auto flex flex-col items-center">
        <NavbarLandingPage />

        <div className="flex h-full justify-evenly md:justify-between flex-col w-full items-center md:flex-row">
          <div className="flex justify-between flex-col w-full md:justify-around items-center text-center md:h-full my-4">
            <div className="flex-shrink w-auto md:w-full">
              <h1 className="mx-auto h-auto">
                <img
                  draggable="false"
                  alt="Title:Express Yourself"
                  className="w-full"
                  src="title.svg"
                />
              </h1>
            </div>
            <div className="text-center">
              <p className="md:block leading-normal text-gray-600 text-2xl md:text-3xl xl:text-3xl ">
                <span> The quickest way to show</span>
                <br />
                <span>your NFTs</span>
              </p>
            </div>
            <div className="invisible w-full md:visible md:w-1/2 lg:w-4/5 my-4">
              <button
                onClick={() => signIn()}
                className="submit md:px-4 2xl:text-xl text-center whitespace-nowrap bg-dirt text-white font-bold rounded-xl lg:rounded-l-none lg:rounded-r-xl w-full lg:w-2/5 px-2 py-2"
              >
                Get Started!
              </button>
            </div>
          </div>
          <div className="flex-shrink w-auto md:w-full min-w-0 min-h-0">
            <img
              className="w-full flex-1 min-w-0 min-h-0"
              draggable="false"
              alt="Guide showing statue to visitors"
              src="museum.svg"
            />
          </div>
        </div>
        <div className="md:hidden w-full sm:mx-0 md:w-2/5 lg:w-2/5 my-4">
          {/* <NameForm /> */}
          <button
            onClick={() => signIn()}
            className="submit md:px-4 2xl:text-xl text-center whitespace-nowrap bg-dirt text-white font-bold rounded-xl lg:rounded-l-none lg:rounded-r-xl w-full lg:w-2/5 px-2 py-2"
          >
            Get Started!
          </button>
        </div>
      </div>
    </div>
  );
}
