import { withRouter, NextRouter } from "next/router";
import React from "react";
import PhoneNavbar from "../components/UserForm/FormNavbar";
import Input from "@material-tailwind/react/Input";
import { signIn } from "next-auth/client";
import Link from "next/link";
import Loading from "../components/Loading";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: "Wrong username/password combination",
  default: "Unable to sign in.",
};

// type MyProps = { csrfToken };
type MyState = { password: String; username: String; loading: Boolean };

interface WithRouterProps {
  router: NextRouter;
  csrfToken;
}

interface MyComponentProps extends WithRouterProps {}

class LoginPage extends React.Component<MyComponentProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { password: "", username: "", loading: false };
    const error = props.router;

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  handleErrors() {
    if (this.state.loading) return null;
    const error = this.props.router.query.error as string;
    // const error = String(this.props.router.query);
    const errorMessage = error && (errors[error] ?? errors.default);
    console.log(error, errorMessage);

    return error ? errorMessage : null;
  }

  handleSubmit(event) {
    console.log("yoo");
    this.setState({ loading: true });
    signIn("credentials", {
      redirect: true,
      username: this.state.username,
      password: this.state.password,
      callbackUrl: "http://localhost:3000/",
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="bg-instagram">
        <main className="xl:max-w-xl">
          <div className="flex flex-col">
            {/* <PhoneNavbar /> */}
            {this.state.loading ? (
              <div className="absolute h-full w-full text-center mx-auto my-auto z-10">
                <Loading />
              </div>
            ) : null}
            <div className="flex flex-col items-center">
              <span className="toggleColour mt-24 text-black no-underline hover:no-underline font-bold">
                {/* To continue, log in to Public Wallet */}
              </span>
            </div>
            <div className="flex flex-col mt-4">
              <form
                id="form"
                className="form w-full"
                onSubmit={this.handleSubmit}
              >
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={this.props.csrfToken}
                />
                <div className="flex xl:text-xl flex-col lg:flex-row mx-12">
                  <Input
                    type="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChangeUsername}
                    placeholder="Email or mobile number"
                    outline={true}
                    size="lg"
                    color="brown"
                    error={this.handleErrors()}
                    required
                  />
                </div>
                <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-8">
                  <Input
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    placeholder="Password"
                    outline={true}
                    size="lg"
                    color="brown"
                    error={this.handleErrors()}
                    required
                  />
                </div>
                <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-8">
                  <button
                    type="submit"
                    className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2"
                  >
                    Log in
                  </button>
                </div>
              </form>
              <div className="flex flex-col items-center">
                <a className="toggleColour mt-4 text-black no-underline hover:no-underline">
                  Forgot your Password?
                </a>
              </div>
              <div className="mt-4 grid grid-cols-7 justify-center text-center">
                <div className="col-start-2 col-span-2 divide-y divide-black">
                  <div>
                    <text>&emsp;</text>
                  </div>
                  <div>
                    <text>&emsp;</text>
                  </div>
                </div>
                <div className="col-start-4 col-span-1 m-auto">
                  <text className="toggleColour text-2xl text-black no-underline hover:no-underline">
                    OR
                  </text>
                </div>
                <div className="col-start-5 col-span-2 divide-y divide-black">
                  <div>
                    <text>&emsp;</text>
                  </div>
                  <div>
                    <text>&emsp;</text>
                  </div>
                </div>
              </div>
              <Link href="/signuppage">
                <div className="flex xl:text-xl flex-col lg:flex-row mx-12 mt-4  text-center whitespace-nowrap bg-white border border-brown rounded-lg px-2 py-2">
                  <button className="text-brown text-xl font-bold">
                    Sign up
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(LoginPage);