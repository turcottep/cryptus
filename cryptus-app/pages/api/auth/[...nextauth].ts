import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { sha256 } from "js-sha256";
import FindUserIdFromWalletAdress from "../../../lib/findUserIdFromWalletAdress";
import FindUserFromUserId from "../../../lib/findUserFromUserId";
import getUserByUsername from "../../../lib/getUserByUsername";

const options = {
  pages: {
    signIn: "/loginpage",
    signOut: "/",
    error: "/loginpage",
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials: any) {
        var user;
        if (credentials.address) {
          user = authorizeWithMetamaskAddress(credentials.address);
        } else if (credentials.username) {
          user = authorizeWithCredentials(
            credentials.username,
            credentials.password
          );
        }
        return user;
      },
    }),
  ],

  session: {
    jwt: true,
  },

  callbacks: {
    async signIn(user, account, profile) {
      console.log("callback user=", user);
      // console.log("callback account=", account);
      // console.log("callback profile=", profile);

      if (user.image == "newFromMetamask") {
        console.log("i'm new from metamask");
        return "/lafleur";
      } else {
        console.log("i'm a regular user");
        // Return false to display a default error message
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
        return true;
      }
    },
    async signOut() {
      return true;
    },
  },
};

export default NextAuth(options);

async function authorizeWithMetamaskAddress(wallet_address) {
  const userId = await FindUserIdFromWalletAdress(wallet_address);
  if (!userId) {
    // //Create Account with this wallet address
    // console.log("Creating new acount");
    // const user = await CreateAccountFromWalletAddress(wallet_address);
    // const newuser = {
    //   name: user.username,
    //   email: user.email,
    //   image: "newFromMetamask",
    // };
    // return newuser;
    console.error("User not found from metamask");
    return null;
  } else {
    const user = await FindUserFromUserId(userId, false);
    if (!user) {
      console.log("unable to find user #2");
      return null;
    }
    const newuser = {
      name: user.username,
      email: user.email,
      image: "test",
    };
    return newuser;
  }
}

async function authorizeWithCredentials(username, password) {
  try {
    const user = await getUserByUsername(username, false);
    const password_hash = sha256(password);
    if (user.hash == password_hash) {
      const newuser = {
        name: user.username,
        email: user.email,
        image: "test",
      };
      return newuser;
    }
  } catch (e) {
    console.error("Erreur :", e);
    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}
