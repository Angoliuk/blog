import Parser from "rss-parser";
import cron from "node-cron";
import { prisma } from "blog/server/db";

type ParserItem = {
  title: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
};

const parser = new Parser<unknown, ParserItem>({});

export const parseGoogleNews = async () => {
  const feed = await parser.parseURL("https://news.google.com/rss");

  // All posts have user, so I creating account for google news
  const googleNewsUser = await prisma.user.upsert({
    where: {
      email: "google@example.com",
    },
    update: {},
    create: {
      email: "google@example.com",
      password: "secretPassword",
    },
  });

  // prisma do not support upsertMany, for now recommended to use transaction
  await prisma.$transaction(
    feed.items.map(
      ({ guid: id, isoDate: createdAt, title, contentSnippet: description }) =>
        prisma.post.upsert({
          where: {
            id,
          },
          update: {
            title,
            description,
          },
          create: {
            id,
            title,
            description,
            createdAt,
            authorId: googleNewsUser.id,
          },
        })
    )
  );
};

export const googleNewsParserTask = cron.schedule(
  "0 0 * * *",
  parseGoogleNews,
  {
    scheduled: false,
  }
);
