import React, { Component } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { ForgotPWValuesProps } from "./ForgotPassword";

export default class FormNavBar extends Component<ForgotPWValuesProps> {
  continue = (e) => {
    console.log(this.props.values);

    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    if (this.props.step > 1 && this.props.step < 5) {
      this.props.prevStep();
    }

    e.preventDefault();
  };
  render() {
    return (
      <div id="header" className="w-full top-0 text-black bg-instagram">
        <div className="w-full h-full py-2">
          <div className="grid grid-cols-6 justify-center">
            <div className="col-start-1 col-span-1 px-2">
              <div id="backButton" className="" onClick={this.back}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="col-start-2 col-span-4 text-center m-auto">
              <span className="toggleColour text-black no-underline hover:no-underline font-bold text-xl">
                Forgot your password
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
