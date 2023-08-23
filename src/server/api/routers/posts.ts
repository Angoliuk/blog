import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "blog/server/api/trpc";

// TODO: error handling
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
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(600),
      })
    )
    .mutation(async ({ input, ctx: { prisma, session } }) => {
      await prisma.post.create({
        data: { ...input, authorId: session.user.id },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .mutation(async ({ input, ctx: { prisma } }) => {
      await prisma.post.delete({
        where: { id: input.postId },
      });
    }),
  edit: protectedProcedure
    .input(
      z.object({
        postId: z.string().min(1),
        updatedValues: z.object({
          title: z.string().min(1).max(100).optional(),
          description: z.string().min(1).max(600).optional(),
        }),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      await prisma.post.update({
        data: input.updatedValues,
        where: { id: input.postId },
      });
    }),
});
