import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavbarLandingPage() {
  const [session, loading] = useSession();

  return (
    <div id="header" className=" w-full top-0 text-black bg-instagram">
      <div className="w-full flex flex-col justify-center h-full md:py-4">
        <div className="flex w-full justify-between items-center md:items-end py-4">
          <img
            className="self-start w-20 h-20 rounded-full border-black border-2 mx-2"
            src="./icons/icon-192x192.png"
            alt="icon"
          />
          <div className="flex w-full h-full justify-between flex-col">
            <span className="w-full text-left align-top text-gray-700 font-semibold text-2xl lg:text-2xl pb-1 pl-4">
              Alexandre Lafleur
            </span>
            <div className="w-full text-sm px-4 pb-2">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around flex-row text-center border-b border-t border-gray-400 ">
          <div className="flex-col ">
            <span className="font-bold">7</span>
            <br />
            <span className="text-gray-400">Owned</span>
          </div>
          <div className="flex-col">
            <span className="font-bold">3</span>
            <br />
            <span className="text-gray-400">On sale</span>
          </div>
          <div className="flex-col">
            <span className="font-bold">24</span>
            <br />
            <span className="text-gray-400">Sold</span>
          </div>
        </div>
        <div className="flex justify-around items-center py-2">
          <svg
            className="h-6 w-6"
            viewBox="-2 -2 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4H4V0H0V4ZM6 16H10V12H6V16ZM0 16H4V12H0V16ZM0 10H4V6H0V10ZM6 10H10V6H6V10ZM12 0V4H16V0H12ZM6 4H10V0H6V4ZM12 10H16V6H12V10ZM12 16H16V12H12V16Z"
              fill="#999999"
            />
          </svg>

          <svg
            className="h-6 w-6 content-center my-auto"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.9 2 2 2.9 2 4V11C2 11.55 2.22 12.05 2.59 12.42L11.59 21.42C11.95 21.78 12.45 22 13 22C13.55 22 14.05 21.78 14.41 21.41L21.41 14.41C21.78 14.05 22 13.55 22 13C22 12.45 21.77 11.94 21.41 11.58ZM13 20.01L4 11V4H11V3.99L20 12.99L13 20.01Z"
              fill="#999999"
            />
            <path
              d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
              fill="#999999"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#999999"
            id="heart-emoji"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
