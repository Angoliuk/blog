import { createTRPCRouter } from "blog/server/api/trpc";
import { authRouter, postsRouter } from "./routers";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
