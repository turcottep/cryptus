import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { sha256 } from "js-sha256";
import prisma from "../../../lib/prisma";
// import FindUserIdFromWalletAdress from "../../../lib/findUserIdFromWalletAdress";
// import FindUserFromUserId from "../../../lib/findUserFromUserId";
// import getUserByUsername from "../../../lib/get_user_by_username";

const options = {
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
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

  // callbacks: {
  //   async signIn(user, account, profile) {

  //     if (user.image == "newFromMetamask") {
  //       return "/lafleur";
  //     } else {
  //       // Return false to display a default error message
  //       // Or you can return a URL to redirect to:
  //       // return '/unauthorized'
  //       return true;
  //     }
  //   },
  //   async signOut() {
  //     return true;
  //   },
  // },
};

export default NextAuth(options);

async function authorizeWithMetamaskAddress(wallet_address) {
  // const userId = await FindUserIdFromWalletAdress(wallet_address);

  const wallet = await prisma.wallet.findUnique({
    where: {
      address: wallet_address,
    },
  });

  const userId = wallet.userId;

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
    // const user = await FindUserFromUserId(userId, true);
    const user = await prisma.user.findUnique({
      include: {
        wallets: true,
      },
      where: {
        id: userId,
      },
    });
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
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

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
