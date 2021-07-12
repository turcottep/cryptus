import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import PhoneNavbar from "../components/PhoneNavbar";
import Input from "@material-tailwind/react/Input";
import Checkbox from "@material-tailwind/react/Checkbox";
import Link from "next/link";
import WalletSignUp from "../components/WalletSignUp";

export default function post(props) {
  const router = useRouter();
  console.log(router, "routes");
  const [page, setPage] = useState(1);

  function NextPage() {
    if (page === 3) return;
    setPage((page) => page + 1);
  }

  function NextPage2() {
    if (page !== 1) return;
    setPage((page) => page + 2);
  }

  return (
    <div className="bg-instagram h-screen">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <PhoneNavbar />
          {page !== 3 && <StepperOne />}
          {page === 3 && <StepperTwo />}

          {page === 1 && <WalletSignUp />}

          {page === 1 && <WalletPage />}
          {page === 2 && <SignupPage />}
          {page === 3 && <AccountinfoPage />}

          {page === 1 && (
            <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-4">
              <button
                onClick={NextPage}
                className="text-xl text-center whitespace-nowrap bg-white text-brown border border-brown rounded-lg w-full px-2 py-2"
              >
                I don't have a wallet
              </button>
            </div>
          )}
          {page === 2 && (
            <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-4">
              <button
                onClick={NextPage}
                // type="submit"
                className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2"
              >
                Sign up
              </button>
            </div>
          )}
          {page === 3 && (
            <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-8">
              <button
                type="submit"
                className="submit text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2"
              >
                Continue
              </button>
            </div>
          )}

          {page !== 3 && <FooterOne />}
          {page === 3 && <FooterTwo />}
        </div>
      </main>
    </div>
  );
}

function StepperOne() {
  return (
    <div className="flex flex-col mt-8">
      <div className="grid grid-cols-2 justify-center">
        <div className="col-start-1 col-span-1">
          <p className="text-brown text-3xl float-right mr-2">&#9679;</p>
        </div>
        <div className="col-start-2 col-span-1">
          <p className="text-gray-500 text-3xl float-left ml-2">&#9679;</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <p className="text-black text-lg text-center">Create Account</p>
      </div>
    </div>
  );
}

function StepperTwo() {
  return (
    <div className="flex flex-col mt-8">
      <div className="grid grid-cols-2 justify-center">
        <div className="col-start-1 col-span-1">
          <p className="text-gray-500 text-3xl float-right mr-2">&#9679;</p>
        </div>
        <div className="col-start-2 col-span-1">
          <p className="text-brown text-3xl float-left ml-2">&#9679;</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <p className="text-black text-lg text-center">User Information</p>
      </div>
    </div>
  );
}

function WalletPage() {
  return (
    <div className="flex flex-col">
      <div className="mt-32 grid grid-cols-7 justify-center text-center">
        <div className="col-start-2 col-span-2 divide-y divide-black">
          <div>
            <text>&emsp;</text>
          </div>
          <div>
            <text>&emsp;</text>
          </div>
        </div>
        <div className="col-start-4 col-span-1 m-auto">
          <text className="toggleColour text-2xl text-black no-underline hover:no-underline">
            OR
          </text>
        </div>
        <div className="col-start-5 col-span-2 divide-y divide-black">
          <div>
            <text>&emsp;</text>
          </div>
          <div>
            <text>&emsp;</text>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignupPage() {
  return (
    <div className="flex flex-col mt-16">
      <form
        id="form"
        className="form w-full"
        //   onSubmit={this.handleSubmit}
      >
        <div className="flex xl:text-xl flex-col lg:flex-row mx-12 ">
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
          <Input
            type="confirmpassword"
            // className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
            name="entry.217945379"
            id="confirmpassword"
            placeholder="Confirm Password"
            outline={true}
            size="lg"
            color="brown"
            //   value={this.state.value}
            //   onChange={this.handleChange}
            required
          />
        </div>
        <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-16">
          <Checkbox
            color="brown"
            text="I have read and accept the terms"
            id="checkbox"
          />
        </div>
      </form>
    </div>
  );
}

function AccountinfoPage() {
  return (
    <div className="flex flex-col mt-20">
      <form
        id="form"
        className="form w-full"
        //   onSubmit={this.handleSubmit}
      >
        <div className="flex xl:text-xl flex-col lg:flex-row mx-12 ">
          <Input
            // type="username"
            // className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
            // name="entry.217945379"
            id="username"
            placeholder="Username"
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
            // type="name"
            // className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
            // name="entry.217945379"
            id="name"
            placeholder="Name"
            outline={true}
            size="lg"
            color="brown"
            //   value={this.state.value}
            //   onChange={this.handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
}

function FooterOne() {
  return (
    <div className="text-center pt-48">
      <Link href="/loginpage">
        <a className="toggleColour text-black underline hover:no-underline">
          Have an account? Log in
        </a>
      </Link>
    </div>
  );
}

function FooterTwo() {
  return (
    <div className="text-center pt-64 mt-16">
      <a
        href="../loginpage2"
        className="toggleColour text-gray-700 no-underline hover:no-underline"
      >
        &gt;&gt; Skip this step &gt;&gt;
      </a>
    </div>
  );
}
