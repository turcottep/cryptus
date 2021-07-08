import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {
  PrismaAdapter
} from "@next-auth/prisma-adapter"
import {
  PrismaClient
} from "@prisma/client"


const prisma = new PrismaClient()

const options = {
  // Configure one or more authentication providers
  // pages:{
  //   signIn: '/loginpage'
  // },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        console.log('YOOO');
        console.log('credentiales', credentials);
        try {
          const res = await fetch("http://localhost:3000/api/users/" + credentials.username, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json"
            }
          })
          const user = await res.json()
          console.log(user.username);
          if (user.description == credentials.password) {
            console.log('Yeah we looking good out here!')
            const user1 = {
              name: 'Alice',
              email: 'Alice',
              image: 'Alice'
            }
            return user1
          }
        } catch (e) {
          console.error('Erreur :', e)
          return null
        }
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jSsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address) 
        // If no error and we have user data, return it
        return null
        // Return null if user data could not be retrieved
      }
    })
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
    secret: process.env.JWT_SECRET,
  },
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)