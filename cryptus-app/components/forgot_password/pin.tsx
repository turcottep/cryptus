import React, { Component } from "react";
import ForgotPWHeader from "./forgot_password_header";
import { ForgotPWValuesProps } from "./forgot_password";
import Input from "@material-tailwind/react/Input";

export default class PINNumber extends Component<ForgotPWValuesProps> {
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
          title="A 6 digit pin number was sent to your email or phone number"
          step={this.props.step}
        />
        <div className="flex xl:text-xl flex-col mt-12">
          <Input
            type="pinnumber"
            id="PINNumber"
            placeholder="Enter 6 digit PIN number"
            outline={true}
            size="lg"
            color="brown"
            required
          />
        </div>
        <button
          onClick={this.continue}
          className="text-lg text-center whitespace-nowrap bg-brown text-white rounded-lg w-full px-4 py-2 mt-8"
        >
          Validate
        </button>
      </div>
    );
  }
}