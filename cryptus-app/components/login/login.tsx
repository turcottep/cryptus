//react and css
import React, { useState, useEffect } from "react";
import s from "./login.module.scss";

//external exports
import { signIn } from "next-auth/client";
import router, { withRouter, NextRouter } from "next/router";
import Input from "@material-tailwind/react/Input";
import Link from "next/link";

//internal imports
import FormNavBar from "../signup/user_form/form_navbar";
import Loading from "../utils/loading";
import {
  Or,
  LoginButton,
  ForgotPasswordButton,
  SignupButton,
  MetamaskButton,
  errors,
} from "./login_components/login_components";
import useInput from "../utils/use_input";

declare let window: any;

type LoginProps = {
  router: NextRouter;
  csrfToken;
};

export default function Login1(props) {
  const { router, csrfToken } = props;
  const [loading, setLoading] = useState<Boolean>(false);

  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername,
  } = useInput({
    id: "username",
    type: "text",
    initialValue: "",
    placeholder: "Email or mobile number",
  });
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput({
    id: "password",
    type: "password",
    initialValue: "",
    placeholder: "Password",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    signIn("credentials", {
      redirect: true,
      username: username,
      password: password,
      callbackUrl: `${window.location.origin}/` + username,
    });
    resetUsername();
    resetPassword();
  };

  const handleError = () => {
    const error =
      typeof window !== "undefined" ? (router.query.error as string) : "";
    const errorMessage = error && (errors[error] ?? errors.default);

    return error ? errorMessage : null;
  };

  return (
    <div className="bg-instagram">
      {loading ? (
        <div className="absolute h-full w-full text-center mx-auto my-auto z-10">
          <Loading />
        </div>
      ) : null}
      <main className="sm:max-w-lg mx-auto">
        {/* <FormNavbar /> */}

        {/* {session && router.push("/" + session.user.name)} */}
        <div className="flex flex-col">
          <MetamaskButton router={router} />

          {Or()}

          <div className="flex flex-col mt-4">
            <form id="form" className="form w-full" onSubmit={handleSubmit}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="flex xl:text-xl flex-col mx-12">
                <Input
                  {...bindUsername}
                  error={handleError}
                  outline={true}
                  size="lg"
                  color="brown"
                  required
                />
              </div>
              <div className="flex xl:text-xl flex-col mx-12 mt-8">
                <Input
                  {...bindPassword}
                  error={handleError}
                  outline={true}
                  size="lg"
                  color="brown"
                  required
                />
              </div>
              <LoginButton>
                <input type="submit" />
              </LoginButton>
            </form>
            <ForgotPasswordButton />
            <Or />
            <SignupButton />
          </div>
        </div>
      </main>
    </div>
  );
}
