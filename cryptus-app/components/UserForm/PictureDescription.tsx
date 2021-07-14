import React, { Component } from "react";
import Input from "@material-tailwind/react/Input";
import TextArea from "@material-tailwind/react/TextArea";
import Image from "@material-tailwind/react/Image";

import FormHeader from "./FormHeader";

export default class PictureDescription extends Component<FormValuesProps> {
  continue = (e) => {
    console.log(this.props.values);

    //@Guillaume Validate here
    const email = this.props.values.email;
    if (true) {
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
        <FormHeader title="Picture and Description" step={this.props.step} />

        <form id="form" className="form w-full mt-16">
          <div className="flex xl:text-xl flex-col items-center lg:flex-row mx-12 ">
            <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full border-gray-300 border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 mx-auto my-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="pt-2 text-gray-600">Profile Picture</span>
          </div>
          <div className="flex xl:text-xl bg-white flex-col lg:flex-row mx-12 mt-8">
            <TextArea
              type="text"
              id="description"
              onChange={this.props.handleChange}
              placeholder="Description"
              outline={true}
              size="lg"
              color="brown"
              required
            />
          </div>

          <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-8">
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
