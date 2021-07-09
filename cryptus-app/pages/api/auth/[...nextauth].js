import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import jwt from "next-auth/jwt";
import { sha256 } from "js-sha256";

const prisma = new PrismaClient();

const options = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/loginpage",
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
        try {
          const res = await fetch(
            "http://localhost:3000/api/users/" + credentials.username,
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
          console.log("hashes comparator : ", password_hash, user.hash);
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
          return null;
        }
        return null;
      },
    }),
    // ...add more providers here
  ],

  session: {
    jwt: true,
  },
};

export default NextAuth(options);
