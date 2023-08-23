import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "blog/server/api/trpc";
import argon from "argon2";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().min(1).max(25),
        password: z.string().min(1).max(50),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      // TODO: error handling
      if (user !== null) return;

      const hashedPassword = await argon.hash(input.password);

      const newUser = await prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
      });

      return newUser;
    }),
});
