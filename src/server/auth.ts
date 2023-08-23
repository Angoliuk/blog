import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { prisma } from "blog/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import argon from "argon2";
import { z } from "zod";
import { env } from "blog/env.mjs";

const loginUserSchema = z.object({
  email: z.string().regex(/^[a-z0-9_-]{3,15}$/g, "Invalid username"),
  password: z.string().min(5, "Password should be minimum 5 characters"),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // TODO: try to move auth logic to trpc route
    CredentialsProvider({
      credentials: {
        email: { type: "text", placeholder: "test@test.com" },
        password: { type: "password", placeholder: "testPass" },
      },
      async authorize(credentials) {
        const { email, password } = loginUserSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const isPasswordValid = await argon.verify(user.password, password);

        return isPasswordValid ? { id: user.id } : null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: env.JWT_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
