import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

type MyProps = { children; title };
type MyState = {};
export default class Feed extends React.Component<MyProps, MyState> {
  render() {
    return (
      <div className="bg-instagram">
        <div>
          <title>{this.props.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </div>

        <main className="container mx-auto max-w-xl min-h-screen">
          {this.props.children}
        </main>
      </div>
    );
  }
}
