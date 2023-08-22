import { type Post } from "@prisma/client";
import { type FC, memo } from "react";
import { Button } from "../ui";

export type CardProps = { post: Post; onPostClick?: () => void };

export const Card: FC<CardProps> = memo(({ post, onPostClick }) => {
  return (
    <Button
      onClick={onPostClick}
      className="my-4 flex w-full flex-col items-start rounded-[20px] bg-white p-5 drop-shadow-card"
    >
      <p className="text-xl">
        {post.title}
        <span className="ml-4 text-xs text-slate-400">
          created at {post.createdAt.toLocaleString()}
        </span>
      </p>
      <p className="px-4">{post.description}</p>
    </Button>
  );
});
