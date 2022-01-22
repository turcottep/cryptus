import React from "react";
import router, { withRouter, NextRouter } from "next/router";

import Login from "../components/login/login";

function LoginPage() {
  return (
    <div className="">
      <title>Mecene Studio</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="author" content="" />
      <meta name="theme-color" content="" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
        rel="stylesheet"
      />

      <main>
        <Login router={router} csrfToken="test" />
      </main>
    </div>
  );
}

export default withRouter(LoginPage);
