import React, { Component } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
type MyProps = {
  prevStep: Function;
  nextStep: Function;
  handleChange: Function;
  values: any;
  step: number;
};

export default class SucessScreen extends Component<MyProps> {
  render() {
    return (
      <div
        id="header"
        className="flex flex-col items-center w-full h-screen top-0 text-black bg-instagram -mt-12 pt-12"
      >
        <span className="font-bold text-lg mt-24">
          Account Creation Sucessful !
        </span>
        <Link href={"/" + this.props.values.username}>
          <div className=" flex xl:text-xl flex-col mx-12 mt-28">
            <button className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2">
              Go To My Profile Page
            </button>
          </div>
        </Link>
      </div>
    );
  }
}
