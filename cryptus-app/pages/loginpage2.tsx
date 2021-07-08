import { useRouter } from "next/router";
import React from "react";
import PhoneNavbar from "../components/PhoneNavbar";
import Input from "@material-tailwind/react/Input";

// function GoToSignUp() {
//   return(
    
//   );
// }

export default function post(props) {
  const router = useRouter();
  console.log(router, "routes");
  return (
    <div className="bg-instagram">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <PhoneNavbar />
          <div className="flex flex-col items-center">
            <text className="toggleColour mt-24 text-black no-underline hover:no-underline font-bold">
                To continue, log in to Public Wallet
            </text>
          </div>
          <div className="flex flex-col mt-4">
          <form
              id="form"
              className="form w-full"
            //   onSubmit={this.handleSubmit}
            >
              <div className="flex xl:text-xl flex-col lg:flex-row mx-12">
                <Input
                  type="username"
                  // className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
                  // name="entry.217945379"
                  id="username"
                  placeholder="Email or mobile number"
                  outline={true}
                  size="lg"
                  color="brown"
                //   value={this.state.value}
                //   onChange={this.handleChange}
                  required
                />
              </div>
              <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-8">
                <Input
                  type="password"
                  // className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
                  name="entry.217945379"
                  id="password"
                  placeholder="Password"
                  outline={true}
                  size="lg"
                  color="brown"
                //   value={this.state.value}
                //   onChange={this.handleChange}
                  required
                />
              </div>
              <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-8">
                <button
                  type="submit"
                  className="submit text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2"
                >
                  Log in
                </button>
              </div>
            </form>
            <div className="flex flex-col items-center">
              <a className="toggleColour mt-4 text-black no-underline hover:no-underline">
                  Forgot your Password?
              </a>
            </div>
            <div className="mt-4 grid grid-cols-7 justify-center text-center">
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
            <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-4  text-center whitespace-nowrap bg-white border border-brown rounded-lg px-2 py-2">
              <a 
                href="../signuppages"
                className="text-brown text-xl font-bold">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}