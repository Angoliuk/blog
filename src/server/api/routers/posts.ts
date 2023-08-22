import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "blog/server/api/trpc";

export const postsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        limit: z.number().max(100).default(20),
        cursor: z.number().default(0),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      const posts = await prisma.post.findMany({
        take: input.limit,
        skip: input.cursor,
        orderBy: {
          createdAt: "asc",
        },
      });
      return { posts, offset: input.cursor + posts.length };
    }),
  getById: publicProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .query(async ({ input, ctx: { prisma } }) => {
      const post = await prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });
      return post;
    }),
  create: publicProcedure
    .input(
      z.object({ title: z.string().min(1), description: z.string().min(1) })
    )
    .mutation(async ({ input, ctx: { prisma, session } }) => {
      await prisma.post.create({
        data: { ...input, creatorId: "session.user.id" },
      });
      // return {
      //   greeting: `Hello ${input.text}`,
      // };
    }),
  delete: publicProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .mutation(async ({ input, ctx: { prisma } }) => {
      await prisma.post.delete({
        where: { id: input.postId },
      });
      // return {
      //   greeting: `Hello ${input.text}`,
      // };
    }),
  edit: publicProcedure
    .input(
      z.object({
        postId: z.string().min(1),
        updatedValues: z.object({
          title: z.string().min(1),
          description: z.string().min(1),
        }),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      await prisma.post.update({
        data: input.updatedValues,
        where: { id: input.postId },
      });
      // return {
      //   greeting: `Hello ${input.text}`,
      // };
    }),
});
