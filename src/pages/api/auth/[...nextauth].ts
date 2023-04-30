import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import credentialsProvider from "next-auth/providers/credentials";
import dbConnect from "lib/dbConnect";
import User from "models/User";
import { compare } from "bcryptjs";
import { IUser } from "./signup";

const { GOOGLE_ID, GOOGLE_SECRET } = process.env;

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID ?? "",
      clientSecret: GOOGLE_SECRET ?? "",
    }),
    credentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect().catch((err) => {
          throw new Error(err);
        });
        // @ts-ignore
        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isPasswordMatch = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id, ...user };
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user;
      session.user = user as IUser;
      return session;
    },
  },
  secret:process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
