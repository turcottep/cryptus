import { useRouter } from "next/router";
import React from "react";
import PhoneNavbar from "../components/PhoneNavbar";

export default function post(props) {
  const router = useRouter();
  console.log(router, "routes");
  return (
    <div className="bg-instagram">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <PhoneNavbar />
          <div className="flex flex-col items-center">
            <h2 className="toggleColour mt-12 text-gray-700 no-underline hover:no-underline font-bold text-3xl lg:text-2xl">
                Login
            </h2>
          </div>
          <div className="flex flex-col mt-12">
          <form
              id="form"
              className="form w-full"
            //   onSubmit={this.handleSubmit}
            >
              <div className="flex xl:text-xl flex-col lg:flex-row mx-12 ">
                <label 
                    className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl text-left" 
                    htmlFor="username">
                    Username
                </label>
                <input
                  type="username"
                  className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
                  name="entry.217945379"
                  id="username"
                //   value={this.state.value}
                //   onChange={this.handleChange}
                  required
                />
                <label 
                    className="toggleColour mt-12 text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl" 
                    htmlFor="password">
                    Password
                </label>
                <input
                  type="password"
                  className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
                  name="entry.217945379"
                  id="password"
                //   value={this.state.value}
                //   onChange={this.handleChange}
                  required
                />
                <button
                  type="submit"
                  className="submit mt-12 md:px-4 2xl:text-xl text-center whitespace-nowrap bg-black text-white font-bold rounded-lg w-full lg:w-2/5 px-2 py-2"
                  >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}