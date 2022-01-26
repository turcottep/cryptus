import React, { Component } from "react";
import ForgotPWHeader from "./ForgotPWHeader";
import Input from "@material-tailwind/react/Input";
import { ForgotPWValuesProps } from "./ForgotPassword";

export default class NewPassword extends Component<ForgotPWValuesProps> {
  continue = (e) => {
    // console.log(this.props.values);
    // const password = this.props.values.password;
    // const confirmedPassword = this.props.values.confirmpassword;
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
          <Input
            type="password"
            id="password"
            onChange={this.props.handleChange}
            placeholder="Password"
            outline={true}
            size="lg"
            color="brown"
            required
          />
        </div>
        <div className="flex xl:text-xl flex-col mt-8">
          <Input
            type="password"
            id="confirmpassword"
            onChange={this.props.handleChange}
            placeholder="Confirm Password"
            outline={true}
            size="lg"
            color="brown"
            required
          />
        </div>
        <button
          //   onClick={this.continue}
          className=" text-lg text-center whitespace-nowrap bg-brown text-white rounded-lg w-full px-4 py-2 mt-12"
        >
          Set new password
        </button>
      </div>
    );
  }
}
