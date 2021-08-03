import React, { Component } from "react";
import ForgotPWHeader from "./ForgotPWHeader";
import { ForgotPWValuesProps } from "./ForgotPassword";
import Input from "@material-tailwind/react/Input";

export default class PINNumber extends Component<ForgotPWValuesProps> {
  continue = (e) => {
    // const pinnumber = this.props.values.pinnumber;
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <div className="flex xl:text-xl flex-col lg:flex-row mx-12 ">
        <ForgotPWHeader
          title="A 6 digit pin number was sent to your email or phone number"
          step={this.props.step}
        />
        <div className="flex xl:text-xl flex-col lg:flex-row mt-12">
          <Input
            type="pinnumber"
            id="PINNumber"
            // value={this.state.pinnumber}
            // onChange={this.handleChange}
            placeholder="Enter 6 digit PIN number"
            outline={true}
            size="lg"
            color="brown"
            // error={this.handleErrors()}
            required
          />
        </div>
        <button
          onClick={this.continue}
          className="relative text-lg text-center whitespace-nowrap bg-brown text-white rounded-lg w-full px-4 py-2 mt-8"
        >
          Validate
        </button>
      </div>
    );
  }
}
