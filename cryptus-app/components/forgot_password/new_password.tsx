import React, { Component } from "react";
import ForgotPWHeader from "./forgot_password_header";
import { ForgotPWValuesProps } from "./forgot_password";

export default class NewPassword extends Component<ForgotPWValuesProps> {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <div className="flex xl:text-xl flex-col mx-12 ">
        <ForgotPWHeader
          title="Enter your new password"
          step={this.props.step}
        />
        <div className="flex xl:text-xl flex-col mt-20">
          <input
            type="password"
            id="password"
            onChange={(e) => {
              this.props.handleChange(e);
            }}
            placeholder="Password"
            color="brown"
            required
          />
        </div>
        <div className="flex xl:text-xl flex-col mt-8">
          <input
            type="password"
            id="confirmpassword"
            onChange={(e) => {
              this.props.handleChange(e);
            }}
            placeholder="Confirm Password"
            color="brown"
            required
          />
        </div>
        <button className=" text-lg text-center whitespace-nowrap bg-brown text-white rounded-lg w-full px-4 py-2 mt-12">
          Set new password
        </button>
      </div>
    );
  }
}
