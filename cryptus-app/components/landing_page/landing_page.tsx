import React, { useState } from "react";
import s from "./landing_page.module.scss";

import { signOut, useSession } from "next-auth/client";
import connectMetamask from "../../lib/connectMetamask";

import NavbarLandingPage from "../navbars/navbar_landing_page/navbar_landing_page";
import Loading from "../utils/loading/loading";

import * as google_analytics from "../../lib/google_analytics";

export default function LandingPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, loadingSession] = useSession();

  return (
    <div className={s.container}>
      {loading && <Loading />}
      <Header session={session} setLoading={{ setLoading }} />
      <div className={s.page1}>
        <div className={s.divisiontext}>
          <div className={s.logodiv}>
            <img className={s.logo} src="/images/pw4.png" />
          </div>
          <div className={s.description}>{"EASIEST WAY TO"}</div>
          <div className={s.title}>{"TRACK YOUR NFTS"}</div>
          <ButtonTryNow setLoading={setLoading} />
        </div>
        <div className={s.divisionimg}>
          <img className={s.img1} src="/images/wallet_iphone.png" />
        </div>
      </div>
      <div className={s.page2}>
        <div className={s.divisionimg}>
          <img className={s.img1} src="/images/market_iphone.png" />
        </div>
        <div className={s.divisiontext}>
          <div className={s.description}>{"WAKE UP AND CHECK YOUR"}</div>
          <div className={s.title}>{"NETWORTH"}</div>
          <div className={s.description}>{"IN A MATTER OF SECONDS"}</div>
        </div>
      </div>
      <div className={s.page3}>
        <div className={s.divisiontext}>
          <div className={s.description}>{"SHARE THE ART YOU"}</div>
          <div className={s.title}>{"LOVE"}</div>
          <div className={s.description}>{"WITH THE ONES WHO"}</div>
          <div className={s.title}>{"MATTER MOST"}</div>
        </div>
        <div className={s.divisionimg}>
          <img className={s.img1} src="/images/wallet_iphone.png" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const Header = (props: { session: any; setLoading: any }) => {
  const { session, setLoading } = props;
  return (
    <div className={s.header}>
      <div className={s.header2}>
        <div className={s.headername}>PublicWallet</div>
        {/* <img className={s.headerlogo} src="/images/pw5.png" /> */}
        <div className={s.signin}>
          {!session ? (
            <div
              className={s.signinbutton}
              onClick={() => connectMetamask({ setLoading })}
            >
              {"SIGN IN"}
            </div>
          ) : (
            <div className={s.signinbutton} onClick={() => signOut()}>
              {"SIGN OUT"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return <div className={s.footer}>All Rights Reserved</div>;
};

const ButtonTryNow = (props: { setLoading: Function }) => {
  const { setLoading } = props;

  return (
    <div className={s.buttondiv}>
      <div className={s.button} onClick={() => connectMetamask({ setLoading })}>
        {"TRY NOW"}
      </div>
    </div>
  );
};

const BoxContainers = () => {
  const boxContainers = [
    {
      text: "Cross plateform wallet viewer to show your NFTs",
      url: "/images/crossPlateformLogo.png",
    },
    {
      text: "Market overview of your faverite collections",
      url: "/images/marketOverviewLogo.png",
    },
    {
      text: " A unique link to share your NFTs with others",
      url: "/images/uniqueLinkLogo.png",
    },
  ];

  return (
    <div className={s.boxesContainer}>
      {boxContainers.map((box, index) => {
        return (
          <div key={index} className={s.displayBoxes}>
            <div className={s.boxesText}>
              <img className={s.boxesLogo} src={box.url} />
              {box.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
