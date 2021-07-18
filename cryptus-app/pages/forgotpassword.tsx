import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

export default function forgotpassword(props) {
  return (
    <div className="bg-instagram">
      <main className="sm:max-w-lg mx-auto">
        <div className="w-full h-full">
          <ForgotPassword />
        </div>
      </main>
    </div>
  );
}