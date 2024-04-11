import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/Users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        console.log(credentials);

        try {
          await connectMongoDB();
          const user = await User.findOne({ username: credentials.username });
          const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

          if (!user) {
            return null;
          } else if (!passwordsMatch) {
            return null;
          } else {
            return user;
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ baseUrl }: any) {
      // Allows relative callback URLs
      // Allows callback URLs on the same origin
      return baseUrl;
    },
    // I used these two callbacks to move some values around so that user.id is available in both the token and the session objects. might come in handy. this data is accessible in the client via getToken and getSession/useSession. since a token (token.jti) and the user id are both available in the token object, we'll call getToken to get those two values and use them as arguments for the me query
    async jwt({ token, user }: any) {
      // user is the value returned from the authorize function above
      user && (token.user = user);
      console.log("token", token);
      // token {
      //   sub: '6',
      //   user: { id: 6 },
      //   iat: 1676950152,
      //   exp: 1679542152,
      //   jti: 'cdce51a6-7d61-4e2d-9bbc-6ed288bf91a2'
      // }
      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        username: String(token.user.username),
        token: token.jti,
      };
      // console.log("session", session)
      // session {
      //   user: {
      //     id: 6
      //     token: 'cdce51a6-7d61-4e2d-9bbc-6ed288bf91a2'
      //   }
      // }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // the route used to login
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
