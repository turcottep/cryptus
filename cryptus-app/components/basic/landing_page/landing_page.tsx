import React, { useState } from "react";
import s from "./landing_page.module.scss";

import { signIn, useSession } from "next-auth/client";
import connectMetamask from "../../../lib/connectMetamask";

import Loading from "../../utils/loading/loading";
import MetamaskButton2 from "../../utils/metamask/metamaskbutton2";
import mixpanel from "mixpanel-browser";

import * as google_analytics from "../../../lib/google_analytics";

export default function LandingPage(props: { isMobile: boolean }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, loadingSession] = useSession();
  const [[angle_x, angle_y], set_angles] = useState<[number, number]>([0, 0]);
  const ref = React.useRef<HTMLDivElement>(null);

  const track_mouse = (e) => {
    // console.log(e.clientX, e.clientY);
    const x = e.clientX;
    const y = e.clientY;
    const constrain = 100;
    const box = ref.current.getBoundingClientRect();
    // console.log("box", e.target);
    const angle_x_temp = -(y - box.y - box.height / 2) / constrain;
    const angle_y_temp = (x - box.x - box.width / 2) / constrain;
    set_angles([angle_x_temp, angle_y_temp]);
  };

  const stop_track_mouse = () => {
    set_angles([0, 0]);
  };

  return (
    <div className={s.container}>
      {loading && <Loading />}
      <Header
        session={session}
        setLoading={setLoading}
        isMobile={props.isMobile}
      />
      <div
        className={s.page1}
        ref={ref}
        onMouseMove={track_mouse}
        onMouseLeave={stop_track_mouse}
      >
        <div className={s.divisiontext}>
          <div className={s.logodiv}>
            <img className={s.logo} src="/images/pw4.png" />
          </div>
          <div className={s.description}>{"EASIEST WAY TO"}</div>
          <div className={s.title}>{"TRACK YOUR NFTS"}</div>
          <ButtonTryNow setLoading={setLoading} isMobile={props.isMobile} />
        </div>
        <div className={s.divisionimg}>
          <img
            className={s.img1}
            style={{
              transform: `perspective(256px) rotateX(${angle_x}deg) rotateY(${angle_y}deg)`,
            }}
            src="/images/wallet_iphone.png"
          />
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

const Header = (props: { session: any; setLoading: any; isMobile }) => {
  const { session, setLoading } = props;
  return (
    <div className={s.header}>
      <div className={s.header2}>
        <div className={s.headername}>PublicWallet</div>
        {/* <img className={s.headerlogo} src="/images/pw5.png" /> */}
        <MetamaskButton2
          session={session}
          setLoading={setLoading}
          isMobile={props.isMobile}
        />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className={s.footer}>
      <div>All Rights Reserved</div>

      <div
        onClick={() => {
          console.log("secret sign in");
          signIn("credentials", {
            redirect: true,
            address: "0x68c4D9E03D7D902053C428Ca2D74b612Db7F583A".toLowerCase(),
            callbackUrl: `${window.location.origin}/apeholder`,
          });
        }}
      >
        ©
      </div>
    </div>
  );
};

const ButtonTryNow = (props: { setLoading: Function; isMobile }) => {
  const { setLoading } = props;

  const ocm = () => {
    mixpanel.track("Try Now");
    connectMetamask(setLoading, props.isMobile);
  };

  return (
    <div className={s.buttondiv}>
      <div className={s.button} onClick={ocm}>
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
