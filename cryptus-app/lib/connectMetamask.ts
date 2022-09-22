import { signIn } from "next-auth/react";
import CreateAccountFromWalletAddress from "./createAccountFromWalletAddress";
import FindUserFromUserId from "./findUserFromUserId";
import FindUserIdFromWalletAdress from "./findUserIdFromWalletAdress";

import detectEthereumProvider from "@metamask/detect-provider";

const connectMetamask = async (setLoading: Function, isMobile) => {
  // router.push("login?");
  setLoading(true);
  try {
    const provider = (await detectEthereumProvider()) as any;

    if (!provider) {
      console.log("please donwload MetaMask");
      console.log("isMobile", isMobile);

      if (isMobile) {
        window
          .open(
            "https://metamask.app.link/dapp/www.publicwallet.app/",
            "_blank"
          )
          .focus();
      } else {
        window.open("https://metamask.io/", "_blank").focus();
      }
      setLoading(false);
      return;
    }

    console.log("provider", provider);

    await provider.enable();
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    const wallet_address = accounts[0];

    const userId = await FindUserIdFromWalletAdress(wallet_address, false);

    if (!userId) {
      //Create Account with this wallet address
      const user = await CreateAccountFromWalletAddress(wallet_address, false);
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
};

export default connectMetamask;
