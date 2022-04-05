import React, { useState } from "react";
import s from "./landing_page.module.scss";

import connectMetamask from "../../lib/connectMetamask";

import NavbarLandingPage from "../navbars/navbar_landing_page/navbar_landing_page";
import Loading from "../utils/loading/loading";

export default function LandingPage() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className={s.container}>
      {loading && <Loading />}
      <NavbarLandingPage callback={connectMetamask} />
      <div className={s.row}>
        <div className={s.column}>
          <div className={s.appName}>Public Wallet</div>
          <div className={s.topVP}>THE EASIEST WAY TO</div>
          <div className={s.bottomVP}>SHOW YOUR NFTS</div>
          <ButtonTryNow loading={loading} setLoading={setLoading} />
        </div>
        <div className={s.column}>
          <div className={s.rowAppOverview}>
            <div className={s.columnAppOverview}>
              <img
                className={s.imgAppOverview}
                src="/images/walletViewerLandingPage.png"
              />
            </div>
            <div className={s.columnAppOverview}>
              <img
                className={s.imgAppOverview}
                src="/images/marketOverviewLandingPage.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className={s.solidHr}></hr>
      </div>
      <BoxContainers />
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <div className={s.contactUsSection}>
      <div className={s.contactUsText}>
        <h1>Contact us on:</h1>
        <a href="https://twitter.com">
          <img className={s.twitterLogo} src="/images/twitter_black.png" />
        </a>
      </div>
    </div>
  );
};

const ButtonTryNow = (props: { loading: boolean; setLoading: Function }) => {
  const { loading, setLoading } = props;

  return (
    <div className={s.clickToAction}>
      <button
        className={s.clickToActionButton}
        onClick={() => connectMetamask({ loading, setLoading })}
      >
        TRY IT NOW!
      </button>
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
