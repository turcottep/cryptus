import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import jwt from "next-auth/jwt";
import { sha256 } from "js-sha256";

const options = {
  pages: {
    signIn: "/loginpage",
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

      async authorize(credentials) {
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
};

export default NextAuth(options);

async function authorizeWithMetamaskAddress(wallet_address) {
  const userId = await FindUserIdFromWalletAdress(wallet_address);
  if (!userId) {
    //Create Account with this wallet address
    console.log("Creating new acount");
    const user = await CreateAccountFromWalletAddress(wallet_address);
    const newuser = {
      name: user.username,
      email: user.email,
      image: "test",
    };
    return newuser;
  } else {
    const user = GetUserFromUserId(userId);
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

async function GetUserFromUserId(userId) {
  console.log("id:", userId);
  try {
    const res = await fetch("http://localhost:3000/api/users/id", {
      method: "POST",
      body: JSON.stringify({ id: userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
    return user;
  } catch (e) {
    console.error("Erreur :", e);
    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}

async function authorizeWithCredentials(username, password) {
  try {
    const res = await fetch("http://localhost:3000/api/users/" + username, {
      method: "POST",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
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

async function FindUserIdFromWalletAdress(wallet_address) {
  try {
    const res = await fetch("http://localhost:3000/api/leads/walletaddress", {
      method: "POST",
      body: JSON.stringify({ address: wallet_address }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const wallet = await res.json();
    return wallet.id;
  } catch (e) {
    console.error("Erreur :", e);
    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}

async function CreateAccountFromWalletAddress(wallet_address) {
  console.log("lil finction");
  const res = await fetch(
    "http://localhost:3000/api/leads/createWalletFromAddress",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: wallet_address,
        external_url:
          "https://api.opensea.io/api/v1/assets?owner=" +
          wallet_address +
          "&order_direction=asc&offset=0&limit=50",
        blockchain_id: "ETH",
      }),
    }
  );
  const user = await res.json();
  console.log("this is the man I received:", user);
  return user;
}
