import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import PhoneNavbar from "../components/PhoneNavbar";

export default function post(props) {
  const router = useRouter();
  console.log(router, "routes");
  const [page, setPage] = useState(1);

  function NextPage() {
    if (page === 2) return;
    setPage((page) => page + 1);
  }

  function PrevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  return (
    <div className="bg-instagram">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <PhoneNavbar />
          <div className="flex flex-col items-center">
            <h2 className="toggleColour mt-12 text-gray-700 no-underline hover:no-underline font-bold text-3xl lg:text-2xl">
              Sign up
            </h2>
            <div className="w-full">
              {page === 1 && (
                <div className="grid grid-cols-2">
                  <div className="col-start-1 col-span-1">
                    <button className="float-left ml-24 mt-12 text-2xl text-center bg-gray-600 text-white font-bold rounded-lg w-1/4 lg:w-2/5 py-2">
                      1
                    </button>
                  </div>
                  <div className="col-start-2 col-span-1">
                    <button className="float-right mr-24 mt-12 text-2xl text-center bg-gray-300 text-black font-bold rounded-lg w-1/4 lg:w-2/5 py-2">
                      2
                    </button>
                  </div>
                </div>
              )}
              {page === 2 && (<div className="grid grid-cols-2">
                  <div className="col-start-1 col-span-1">
                    <button className="float-left ml-24 mt-12 text-2xl text-center bg-gray-300 text-black font-bold rounded-lg w-1/4 lg:w-2/5 py-2">
                      1
                    </button>
                  </div>
                  <div className="col-start-2 col-span-1">
                    <button className="float-right mr-24 mt-12 text-2xl text-center bg-gray-600 text-white font-bold rounded-lg w-1/4 lg:w-2/5 py-2">
                      2
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2">
              <div className="col-start-1 col-span-1 mr-9">
                Basic Info
              </div>
              <div className="col-start-2 col-span-1 ml-11">
                Profile
              </div>
            </div>
            <div className="w-full">
              {page === 1 && <PageOne />}
              {page === 2 && <PageTwo />}
            </div>
            <div className="w-full ">
              {page === 1 && (
                <button
                  onClick={NextPage}
                  className="float-right mt-12 mr-12 md:px-4 2xl:text-xl text-center whitespace-nowrap bg-black text-white font-bold rounded-lg w-1/3 lg:w-2/5 px-2 py-2"
                >
                  Next
                </button>
              )}
              {page === 2 && (
                <div className="grid grid-cols-2">
                  <div className="col-start-1 col-span-1">
                    <button
                      onClick={PrevPage}
                      className="float-left ml-12 mt-12 md:px-4 2xl:text-xl text-center whitespace-nowrap bg-black text-white font-bold rounded-lg w-1/2 lg:w-2/5 px-2 py-2"
                    >
                      Back
                    </button>
                  </div>
                  <div className="col-start-2 col-span-1">
                    <button
                      type="submit"
                      className="submit float-right mr-12 mt-12 md:px-4 2xl:text-xl text-center whitespace-nowrap bg-black text-white font-bold rounded-lg w-1/2 lg:w-2/5 px-2 py-2"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PageOne() {
  return (
    <div className="flex flex-col mt-12">
      <form
        id="form"
        className="form w-full"
        //   onSubmit={this.handleSubmit}
      >
        <div className="flex xl:text-xl flex-col lg:flex-row mx-12 ">
          <label
            className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl text-left"
            htmlFor="firstname"
          >
            First Name
          </label>
          <input
            type="firstname"
            className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
            name="entry.217945379"
            id="firstname"
            //   value={this.state.value}
            //   onChange={this.handleChange}
            required
          />
          <label
            className="toggleColour mt-10 text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl text-left"
            htmlFor="lastname"
          >
            Last Name
          </label>
          <input
            type="lastname"
            className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
            name="entry.217945379"
            id="lastname"
            //   value={this.state.value}
            //   onChange={this.handleChange}
            required
          />
          <label
            className="toggleColour mt-10 text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
            name="entry.217945379"
            id="email"
            //   value={this.state.value}
            //   onChange={this.handleChange}
            required
          />
          <label
            className="toggleColour mt-10 text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl"
            htmlFor="phonenumber"
          >
            Phone Number
          </label>
          <input
            type="phonenumber"
            className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
            name="entry.217945379"
            id="phonenumber"
            //   value={this.state.value}
            //   onChange={this.handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
}

function PageTwo() {
  return (
    <div className="flex flex-col mt-12">
      <form
        id="form"
        className="form w-full"
        //   onSubmit={this.handleSubmit}
      >
        <div className="flex xl:text-xl flex-col lg:flex-row mx-12 ">
          <label
            className="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl text-left"
            htmlFor="username"
          >
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
            className="toggleColour mt-10 text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl text-left"
            htmlFor="password"
          >
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
          <label
            className="toggleColour mt-10 text-gray-700 no-underline hover:no-underline font-bold text-xl lg:text-2xl"
            htmlFor="confirmpassword"
          >
            Confirm Password
          </label>
          <input
            type="confirmpassword"
            className="w-full bg-white lg:text-left rounded-lg px-2 py-2 border border-gray-500 "
            name="entry.217945379"
            id="confirmpassword"
            //   value={this.state.value}
            //   onChange={this.handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
}
