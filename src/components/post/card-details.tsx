import { type Post } from "@prisma/client";
import { type FC, memo } from "react";
import { Button } from "../ui";

export type CardDetailsProps = { post: Post; onPostEditClick?: () => void };

export const CardDetails: FC<CardDetailsProps> = memo(
  ({ post, onPostEditClick }) => {
    return (
      <div className="flex w-full flex-col items-start rounded-[20px] bg-white p-5 drop-shadow-card">
        <p className="text-xl">
          {post.title}
          <span className="ml-4 text-xs text-slate-400">
            created at {post.createdAt.toLocaleString()}
          </span>
        </p>
        <p className="px-4">{post.description}</p>
        <Button
          className="group flex self-end rounded-md border p-2 transition-all hover:bg-slate-600"
          onClick={onPostEditClick}
        >
          <p className="group-hover:text-white">Edit</p>
        </Button>
      </div>
    );
  }
);
