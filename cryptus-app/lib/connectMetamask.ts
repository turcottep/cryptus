import { signIn } from "next-auth/client";
import CreateAccountFromWalletAddress from "./createAccountFromWalletAddress";
import FindUserFromUserId from "./findUserFromUserId";
import FindUserIdFromWalletAdress from "./findUserIdFromWalletAdress";

const connectMetamask = async (props: { setLoading: Function }) => {
  const { setLoading } = props;
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

declare let window: any;
export default connectMetamask;
