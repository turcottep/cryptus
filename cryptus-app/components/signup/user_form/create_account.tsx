import React, { Component } from "react";
import Input from "@material-tailwind/react/Input";
import Checkbox from "@material-tailwind/react/Checkbox";
import FormHeader from "./form_header";
import { FormValuesProps } from "../signup";
import { sha256 } from "js-sha256";
import router from "next/router";

const errors = {
  UniqueEmail: "This email is already in use!",
  default: "Unable to sign in.",
};
type MyState = { error: String };

export default class CreateAccount extends Component<FormValuesProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { error: "" };
    this.handleErrorEmail = this.handleErrorEmail.bind(this);
  }
  continue = (e) => {
    const email = this.props.values.email;
    const password = this.props.values.password;
    const confirmedPassword = this.props.values.confirmpassword;
    const checkbox = this.props.values.checkbox;

    if (validateEmail(email)) {
      if (password == confirmedPassword) {
        if (checkbox == "on") {
          this.props.changeState("loading", true);

          const hashedPassword = sha256(password);
          const res = createUser(email, hashedPassword).then((res) => {
            this.props.changeState("loading", false);

            if (res.status == 202) {
              this.setState({ error: "UniqueEmail" });
            } else {
              this.props.nextStep();
            }
          });
        } else {
          alert("Please accept the terms and conditions");
        }
      } else {
        alert("Please input the same password");
      }
    } else {
      alert("Please input a valid email");
    }

    e.preventDefault();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleErrorEmail() {
    const error = String(this.state.error);
    const errorMessage = error && (errors[error] ?? errors.default);

    return error ? errorMessage : null;
  }

  render() {
    const { values, handleChange } = this.props;

    return (
      <div className="flex flex-col ">
        <FormHeader title="Create Account" step={this.props.step} />

        <form id="form" className="form w-full mt-16">
          <div className="flex xl:text-xl bg-white flex-col  mx-12 ">
            <Input
              type="email"
              id="email"
              onChange={this.props.handleChange}
              placeholder="Email"
              outline={true}
              size="lg"
              color="brown"
              error={this.handleErrorEmail()}
              required
            />
          </div>
          <div className="flex xl:text-xl bg-white flex-col  mx-12 mt-8">
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
          <div className="flex xl:text-xl bg-white flex-col  mx-12 mt-8">
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
          <div className="flex xl:text-xl  flex-col  mx-12 mt-8">
            <Checkbox
              onChange={this.props.handleChange}
              color="brown"
              text="I have read and accept the terms"
              id="checkbox"
            />
          </div>
          <div className=" flex xl:text-xl flex-col  mx-12 mt-28">
            <button
              onClick={this.continue}
              className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2"
            >
              Sign up
            </button>
          </div>
          <div className=" flex xl:text-xl flex-col  mx-12 mt-4">
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="text-sm text-center whitespace-nowrap  text-black  rounded-lg px-2 py-2"
            >
              Have an account? Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

async function createUser(email, hashedPassword) {
  const response = await fetch("api/leads/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, hash: hashedPassword }),
  });
  return response;
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
