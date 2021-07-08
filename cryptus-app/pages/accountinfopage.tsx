import { useRouter } from "next/router";
import React from "react";
import PhoneNavbar from "../components/PhoneNavbar";
import Input from "@material-tailwind/react/Input";

export default function post(props) {
  const router = useRouter();
  console.log(router, "routes");
  return (
    <div className="bg-instagram h-screen">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <PhoneNavbar />
          <div className="flex flex-col mt-48">
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
              <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-8">
                <button
                  type="submit"
                  className="submit text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2"
                >
                  Continue
                </button>
              </div>
            </form>
            {/* I tried making it stick to the bottom, but failed */}
            <div className="text-center pt-64 mt-16"> 
              <a className="toggleColour text-gray-700 no-underline hover:no-underline">
                &gt;&gt; Skip this step &gt;&gt;
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}