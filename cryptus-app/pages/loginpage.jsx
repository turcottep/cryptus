import { useRouter } from "next/router";
import React from "react";

import Link from "next/link";
import {
  signIn,
  signOut,
  useSession,
  providers,
  getSession,
  csrfToken,
  getCsrfToken,
} from "next-auth/client";

export default function SignIn(props, csrfToken) {
  // const [ session, loading ] = useSession()
  const router = useRouter();

  return (
    <div className="bg-instagram">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <h2 className="toggleColour mt-12 text-gray-700 no-underline hover:no-underline font-bold text-3xl lg:text-2xl">
              Login
            </h2>
          </div>
          <div className="flex flex-col mt-12">
            <form
              method="post"
              action="/api/auth/callback/credentials"
              id="form"
              className="form w-full"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="flex xl:text-xl flex-col lg:flex-row mx-12 ">
                <label
                  className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl text-left"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
                  name="username"
                  id="username"
                  required
                />
                <label
                  className="toggleColour mt-12 text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
                  name="password"
                  id="password"
                  required
                />
                {/*#TODO
                 {/* Calls NextAuth SignIn function CsrfToken is handled automatically
                 signIn('credentials', { redirect: false, password: 'password' })
                 You can specify a different callbackUrl :
                 signIn(null, { callbackUrl: 'http://localhost:3000/foo' })*/}
              </div>
            </form>
            <button
              onClick={() =>
                signIn("credentials", {
                  redirect: true,
                  username: document.getElementById("username").value,
                  password: document.getElementById("password").value,
                  callbackUrl: "http://localhost:3000/",
                })
              }
              className="submit mt-12 md:px-4 2xl:text-xl text-center whitespace-nowrap bg-black text-white font-bold rounded-lg w-full lg:w-2/5 px-2 py-2"
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
