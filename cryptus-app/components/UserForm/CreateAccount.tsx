import React, { Component } from "react";
import Input from "@material-tailwind/react/Input";
import Checkbox from "@material-tailwind/react/Checkbox";
import FormHeader from "./FormHeader";
import { FormValuesProps } from "./UserForm";

export default class CreateAccount extends Component<FormValuesProps> {
  continue = (e) => {
    console.log(this.props.values);

    //@Guillaume Validate and send to database here
    const email = this.props.values.email;
    if (true) {
      //prsima.create...
      this.props.nextStep();
    }

    e.preventDefault();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    console.log(values);

    return (
      <div className="flex flex-col ">
        <FormHeader title="Create Account" step={this.props.step} />

        <form id="form" className="form w-full mt-16">
          <div className="flex xl:text-xl bg-white flex-col lg:flex-row mx-12 ">
            <Input
              type="email"
              id="email"
              onChange={this.props.handleChange}
              placeholder="Email"
              outline={true}
              size="lg"
              color="brown"
              required
            />
          </div>
          <div className="flex xl:text-xl bg-white flex-col lg:flex-row mx-12 mt-8">
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
          <div className="flex xl:text-xl bg-white flex-col lg:flex-row mx-12 mt-8">
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
          <div className="flex xl:text-xl  flex-col lg:flex-row mx-12 mt-8">
            <Checkbox
              color="brown"
              text="I have read and accept the terms"
              id="checkbox"
            />
          </div>
          <div className=" flex xl:text-xl flex-col lg:flex-row mx-12 mt-28">
            <button
              onClick={this.continue}
              className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
