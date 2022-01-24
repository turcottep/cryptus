import router, { withRouter, NextRouter } from "next/router";
import React from "react";
import FormNavbar from "../components/UserForm/FormNavbar";
import Input from "@material-tailwind/react/Input";
import { signIn } from "next-auth/client";
import Link from "next/link";
import Loading from "../components/Loading";
import FindUserIdFromWalletAdress from "../lib/findUserIdFromWalletAdress";
import CreateAccountFromWalletAddress from "../lib/createAccountFromWalletAddress";
import FindUserFromUserId from "../lib/findUserFromUserId";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  CancelMetamask: "Metamask sign-in error.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: "Wrong username/password combination",
  default: "Unable to sign in.",
};

declare let window: any;

const or = () => {
  return (
    <div className="mt-4 grid grid-cols-7 justify-center text-center">
      <div className="col-start-2 col-span-2 divide-y divide-black">
        <div>
          <span>&emsp;</span>
        </div>
        <div>
          <span>&emsp;</span>
        </div>
      </div>
      <div className="col-start-4 col-span-1 m-auto">
        <span className="toggleColour text-2xl text-black no-underline hover:no-underline">
          OR
        </span>
      </div>
      <div className="col-start-5 col-span-2 divide-y divide-black">
        <div>
          <span>&emsp;</span>
        </div>
        <div>
          <span>&emsp;</span>
        </div>
      </div>
    </div>
  );
};

// type MyProps = { csrfToken };
type MyState = { password: String; username: String; loading: Boolean };

interface WithRouterProps {
  router: NextRouter;
  csrfToken;
}

interface MyComponentProps extends WithRouterProps { }

class LoginPage extends React.Component<MyComponentProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { password: "", username: "", loading: false };
    const error = props.router;

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCredentialsErrors = this.handleCredentialsErrors.bind(this);
  }

  handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  handleCredentialsErrors() {
    if (this.state.loading) return null;
    const error = this.props.router.query.error as string;
    const errorMessage = error && (errors[error] ?? errors.default);

    return error ? errorMessage : null;
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    signIn("credentials", {
      redirect: true,
      username: this.state.username,
      password: this.state.password,
      callbackUrl: `${window.location.origin}/` + this.state.username,
    });
    event.preventDefault();
  }

  handleClick = async () => {
    router.push("loginpage?");
    this.setState({ loading: true });
    // if (!window.ethereum) {
    //   console.log("please donwload MetaMask");
    //   window.open("https://metamask.io/", "_blank").focus();
    //   this.setState({ loading: false });
    // } else {
    try {
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const wallet_address = accounts[0];

      const userId = await FindUserIdFromWalletAdress(wallet_address, false);

      if (!userId) {
        //Create Account with this wallet address
        const user = await CreateAccountFromWalletAddress(
          wallet_address,
          false
        );
        router.push("signuppage?step=3");
      } else {
        const user = await FindUserFromUserId(userId, false, false);
        signIn("credentials", {
          redirect: true,
          address: wallet_address,
          callbackUrl: `${window.location.origin}/` + user.username,
        });
      }
    } catch (error) {
      // console.error(error);
      this.setState({ loading: false });
      router.push("loginpage?error=CancelMetamask");
    }
    // }
  };

  render() {
    return (
      <div className="bg-instagram">
        {this.state.loading ? (
          <div className="absolute h-full w-full text-center mx-auto my-auto z-10">
            <Loading />
          </div>
        ) : null}
        <main className="sm:max-w-lg mx-auto">
          {/* <FormNavbar /> */}

          {/* {session && router.push("/" + session.user.name)} */}
          <div className="flex flex-col">
            <div className="mx-12">
              <button
                onClick={this.handleClick}
                className="text-xl text-center bg-white text-brown border-4 border-brown rounded-lg w-full px-4 py-8 mt-20"
              >
                <div className="flex justify-between items-center">
                  <img
                    className="flex-shrink w-12 h-12"
                    src="../MetaMask_Fox.svg"
                    alt="MetaMask Fox Logo"
                  />
                  <span>Metamask</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </button>
            </div>

            {or()}

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
                <div className="flex xl:text-xl flex-col mx-12">
                  <Input
                    type="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChangeUsername}
                    placeholder="Email or mobile number"
                    outline={true}
                    size="lg"
                    color="brown"
                    error={this.handleCredentialsErrors()}
                    required
                  />
                </div>
                <div className="flex xl:text-xl flex-col mx-12 mt-8">
                  <Input
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    placeholder="Password"
                    outline={true}
                    size="lg"
                    color="brown"
                    error={this.handleCredentialsErrors()}
                    required
                  />
                </div>
                <div className="flex xl:text-xl flex-col mx-12 mt-8">
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
              {or()}
              <Link href="/signuppage">
                <div className="flex xl:text-xl flex-col mx-12 mt-4  text-center whitespace-nowrap bg-white border border-brown rounded-lg px-2 py-2">
                  <button className="text-brown text-center text-xl font-bold">
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
