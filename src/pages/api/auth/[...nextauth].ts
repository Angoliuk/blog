import NextAuth from "next-auth";
import { authOptions } from "blog/server/auth";

export default NextAuth(authOptions);
