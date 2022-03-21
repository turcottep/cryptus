import React, { useState } from "react";
import NameForm from "./name_form";
import NavbarLandingPage from "../navbars/navbar_landing_page/navbar_landing_page";
import { signIn } from "next-auth/client";
import FindUserIdFromWalletAdress from "../../lib/findUserIdFromWalletAdress";
import CreateAccountFromWalletAddress from "../../lib/createAccountFromWalletAddress";
import FindUserFromUserId from "../../lib/findUserFromUserId";
import Loading from "../utils/loading/loading";
// import walletViewerLandingPage from "../../public/images/backgroungLandingPage.png";

import s from "./landing_page.module.scss";

export default function LandingPage() {
  const [loading, setLoading] = useState<Boolean>(false);

  const connectMetamask = async () => {
    // router.push("login?");
    setLoading(true);
    if (!window.ethereum) {
      console.log("please donwload MetaMask");
      window.open("https://metamask.io/", "_blank").focus();
      setLoading(false);
    } else {
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
          signIn("credentials", {
            redirect: true,
            address: wallet_address,
            callbackUrl: `${window.location.origin}/edit_profile`,
          });
        } else {
          const user = await FindUserFromUserId(userId, false, false);
          signIn("credentials", {
            redirect: true,
            address: wallet_address,
            callbackUrl: `${window.location.origin}/` + user.username,
          });
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        // router.push("login?error=CancelMetamask");
      }
    }
  };

  return (
    <div className={s.container}>
      {loading && <Loading />}
      <div className={s.row}>
        <div className={s.header}>
          <NavbarLandingPage callback={connectMetamask} />
        </div>

        <div className={s.column}>
          <div className={s.appNameSection}>
            <div>
              <h1 className={s.appName}>Public Wallet</h1>
            </div>
            <div>
              <h3 className={s.topVP}>THE EASIEST WAY TO</h3>
              <h3 className={s.bottomVP}>SHOW YOUR NFTS</h3>
            </div>
            <div className={s.clickToAction}>
              <button
                className={s.clickToActionButton}
                onClick={() => connectMetamask()}
              >
                TRY IT NOW!
              </button>
            </div>
          </div>
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

      <div className={s.boxesContainer}>
        <div className={s.displayBoxes}>
          <div className={s.boxesText}>
            Cross plateform
            <br />
            wallet viewer to
            <br />
            show your NFTs
          </div>
        </div>
        <div className={s.displayBoxes}>
          <div className={s.boxesText}>
            Market overview of
            <br />
            your faverite
            <br />
            collections
          </div>
        </div>
        <div className={s.displayBoxes}>
          <div className={s.boxesText}>
            A unique link to
            <br />
            share your NFTs
            <br />
            with others
          </div>
        </div>
      </div>
    </div>
  );
}
declare let window: any;
