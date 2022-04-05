import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

import s from "./navbar_landing_page.module.scss";

export default function NavbarLandingPage(props: { callback: Function }) {
  const [session, loading] = useSession();

  return (
    <div id="header" className={s.container}>
      <div className={s.content}>
        <div className={s.contentSecondLayer}>
          <Link href="/">
            <a className={s.appName}>Public Wallet</a>
          </Link>
          {session ? (
            <>
              <button className={s.signButton} onClick={() => signOut()}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button className={s.signButton} onClick={() => props.callback()}>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
