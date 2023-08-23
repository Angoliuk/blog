import { type Post } from "@prisma/client";
import { type FC, memo } from "react";
import { Button } from "../ui";
import { useSession } from "next-auth/react";
import { tw } from "blog/utils";

export type CardDetailsProps = {
  post: Post;
  onPostEditClick?: () => void;
  onPostDeleteClick?: () => void;
};

export const CardDetails: FC<CardDetailsProps> = memo(
  ({ post, onPostEditClick, onPostDeleteClick }) => {
    const { data: session } = useSession();
    return (
      <div className="flex w-full flex-col items-start rounded-[20px] bg-white p-5 drop-shadow-card">
        <div>
          <div className="flex w-full flex-col">
            <p className="text-left text-xl">Title: {post.title}</p>
            <p className="text-left text-xl">Description: {post.description}</p>
            <p
              className={tw(
                "text-right text-xs text-slate-400",
                session && "mb-2"
              )}
            >
              created at: {post.createdAt.toLocaleString()}
            </p>
          </div>
        </div>
        {!!session?.user && (
          <div className="flex w-full justify-end gap-4">
            <Button
              className="group rounded-md border p-2 transition-all hover:bg-slate-600"
              onClick={onPostDeleteClick}
            >
              <p className="group-hover:text-white">Delete</p>
            </Button>
            <Button
              className="group rounded-md border p-2 transition-all hover:bg-slate-600"
              onClick={onPostEditClick}
            >
              <p className="group-hover:text-white">Edit</p>
            </Button>
          </div>
        )}
      </div>
    );
  }
);
