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
        if (credentials.address) {
          try {
            const res = await fetch(
              "http://localhost:3000/api/leads/walletaddress",
              {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const wallet = await res.json();
            if (!wallet.id) {
              return null;
            }
            try {
              const res = await fetch("http://localhost:3000/api/users/id", {
                method: "POST",
                body: JSON.stringify({ id: wallet.userId }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const user = await res.json();
              const newuser = {
                name: user.username,
                email: user.email,
                image: "test",
              };
              return newuser;
            } catch (e) {
              console.error("Erreur :", e);
              // Promise.reject(new Error("Unable to connect to server"));
              return null;
            }
          } catch (e) {
            console.error("Erreur :", e);
            // Promise.reject(new Error("Unable to connect to server"));
            return null;
          }
        } else if (credentials.username) {
          try {
            const res = await fetch(
              "http://localhost:3000/api/users/username",
              {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const user = await res.json();
            const password_hash = sha256(credentials.password);
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

        return null;
      },
    }),
  ],

  session: {
    jwt: true,
  },
};

export default NextAuth(options);
