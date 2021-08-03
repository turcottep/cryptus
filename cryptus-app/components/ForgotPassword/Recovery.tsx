import React, { Component } from "react";
import ForgotPWHeader from "./ForgotPWHeader";
import { ForgotPWValuesProps } from "./ForgotPassword";
import Input from "@material-tailwind/react/Input";

export default class Recovery extends Component<ForgotPWValuesProps> {
  continue = (e) => {
    // console.log(this.props.values);
    // const email = this.props.values.email;
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
          title="Enter your recovery email or phone number"
          step={this.props.step}
        />
        <div className="flex xl:text-xl flex-col mt-12">
          <Input
            type="email"
            id="email"
            // value={this.state.email}
            // onChange={this.handleChangeEmail}
            placeholder="Phone number or email"
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
          Send recovery email/text
        </button>
      </div>
    );
  }
}
