import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import jwt from "next-auth/jwt";

const prisma = new PrismaClient();

const options = {
  // Configure one or more authentication providers
  // pages:{
  //   signIn: '/loginpage'
  // },
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // 24h (in seconds)
    }),
    // ...add more providers here
  ],

  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // adapter: PrismaAdapter(prisma),

  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    secret: process.env.JWT_SECRET,
  },
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
