import React, { Component } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type MyProps = {
  title: String;
  step: Number;
};

export default class FormHeader extends Component<MyProps> {
  render() {
    return (
      <div className="flex flex-col mt-8">
        <div className="flex justify-center mx-auto">
          <div className="">
            <p className="text-brown text-3xl float-right mx-2 ">&#9679;</p>
          </div>
          <div className="">
            {this.props.step < 2 ? (
              <p className="text-gray-500 text-3xl float-left mx-2">&#9679;</p>
            ) : null}
            {this.props.step >= 2 ? (
              <p className="text-brown text-3xl float-left mx-2">&#9679;</p>
            ) : null}
            {this.props.step < 3 ? (
              <p className="text-gray-500 text-3xl float-left mx-2">&#9679;</p>
            ) : null}
            {this.props.step >= 3 ? (
              <p className="text-brown text-3xl float-left mx-2">&#9679;</p>
            ) : null}
            {this.props.step < 4 ? (
              <p className="text-gray-500 text-3xl float-left mx-2">&#9679;</p>
            ) : null}
            {this.props.step >= 4 ? (
              <p className="text-brown text-3xl float-left mx-2">&#9679;</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-black text-lg text-center">{this.props.title}</p>
        </div>
      </div>
    );
  }
}
