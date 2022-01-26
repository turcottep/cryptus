import React, { Component } from "react";
import Input from "@material-tailwind/react/Input";
import FormHeader from "./form_header";
import { FormValuesProps } from "../signup";
import { signIn, useSession } from "next-auth/client";

const errors = {
  UniqueUsername: "This username is already in use!",
  InvalidUsername: "Only lowercase alphanumeric characters are allowed",
  default: "Unable to sign in.",
};

type MyState = { error: String };

export default class AccountInformation extends Component<
  FormValuesProps,
  MyState
> {
  constructor(props) {
    super(props);
    this.state = { error: "" };
    this.handleErrorUsername = this.handleErrorUsername.bind(this);
  }
  continue = (e) => {
    e.preventDefault();

    const email = this.props.values.email;

    let username = this.props.values.username;
    // username = username.toLowerCase();

    if (!username.match(/^[0-9a-z]+$/)) {
      this.setState({ error: "InvalidUsername" });
    } else {
      const displayName = this.props.values.name;
      try {
        this.props.changeState("loading", true);

        const res = updateUser(email, username, displayName).then((res) => {
          this.props.changeState("loading", false);

          if (res.status == 202) {
            this.setState({ error: "UniqueUsername" });
          } else {
            this.props.nextStep();
          }
        });
      } catch (error) {
        alert("Please accept the terms and conditions");
      }
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleErrorUsername() {
    const error = String(this.state.error);
    const errorMessage = error && (errors[error] ?? errors.default) as string;

    return error ? errorMessage : null;
  }

  render() {
    return (
      <div className="flex flex-col ">
        <FormHeader title="Account Information" step={this.props.step} />

        <form id="form" className="form w-full mt-16">
          <div className="flex xl:text-xl bg-white flex-col mx-12 ">
            <Input
              type="username"
              id="username"
              onChange={this.props.handleChange}
              placeholder="Username"
              outline={true}
              size="lg"
              color="brown"
              error={this.handleErrorUsername()}
              required
            />
          </div>
          <div className="flex xl:text-xl bg-white flex-col mx-12 mt-8">
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

          <div className="flex xl:text-xl flex-col mx-12 mt-60">
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

const withSession = (Component) => (props) => {
  const [session, loading] = useSession();

  // if the component has a render property, we are good
  if (Component.prototype.render) {
    return <Component session={session} loading={loading} {...props} />;
  }

  // if the passed component is a function component, there is no need for this wrapper
  throw new Error(
    [
      "You passed a function component, `withSession` is not needed.",
      "You can `useSession` directly in your component.",
    ].join("\n")
  );
};

async function updateUser(email: string, username: string, displayName: string) {
  const response = await fetch("api/leads/updateUsername", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      displayName: displayName,
    }),
  });
  return response;
}

const ClassComponentWithSession = withSession(AccountInformation);
