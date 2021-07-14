import React, { Component } from "react";
import Input from "@material-tailwind/react/Input";
import Checkbox from "@material-tailwind/react/Checkbox";
import FormHeader from "./FormHeader";
import { FormValuesProps } from "./UserForm";

export default class AccountInformation extends Component<FormValuesProps> {
  continue = (e) => {
    console.log(this.props.values);

    //@Guillaume Validate and send to database here
    const email = this.props.values.email;
    if (true) {
      //prsima.update...
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
        <FormHeader title="Account Information" step={this.props.step} />

        <form id="form" className="form w-full mt-16">
          <div className="flex xl:text-xl bg-white flex-col lg:flex-row mx-12 ">
            <Input
              type="username"
              id="username"
              onChange={this.props.handleChange}
              placeholder="Username"
              outline={true}
              size="lg"
              color="brown"
              required
            />
          </div>
          <div className="flex xl:text-xl bg-white flex-col lg:flex-row mx-12 mt-8">
            <Input
              type="name"
              id="name"
              onChange={this.props.handleChange}
              placeholder="Name"
              outline={true}
              size="lg"
              color="brown"
              required
            />
          </div>

          <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-60">
            <button
              onClick={this.continue}
              className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2 mt-2"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  }
}
