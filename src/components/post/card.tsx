import { type Post } from "@prisma/client";
import { type FC, memo } from "react";
import { Button } from "../ui";

export type CardProps = { post: Post; onPostClick?: () => void };

export const Card: FC<CardProps> = memo(({ post, onPostClick }) => {
  return (
    <div className="flex h-fit w-fit flex-row items-start rounded-[20px] bg-white p-5 drop-shadow-card transition-transform hover:scale-[101%] desktop:w-auto desktop:min-w-[500px] desktop:max-w-[700px] desktop:flex-1 mobile:w-full">
      <div className="flex w-full">
        <p className="w-fit text-left text-xl">{post.title}</p>
      </div>
      <div className="flex h-full w-full flex-col justify-between gap-4">
        <p className="w-full text-right text-xs text-slate-400">
          {post.createdAt.toLocaleString()}
        </p>
        <Button
          className="group flex self-end rounded-md border p-2 transition-all hover:bg-slate-600"
          onClick={onPostClick}
        >
          <p className="group-hover:text-white">Details</p>
        </Button>
      </div>
    </div>
  );
});
