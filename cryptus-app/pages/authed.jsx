import { useRouter } from "next/router";
import React from "react";
import PhoneNavbar from "../components/PhoneNavbar";

import Link from "next/link";
import {
  signIn,
  signOut,
  useSession,
  providers,
  getSession,
  csrfToken,
} from "next-auth/client";

export default function post() {
  return (
    <div className="bg-instagram">
      <p>You are authentificated!</p>
    </div>
  );
}
