import { PageWrapper, Post } from "blog/components";
import { api } from "blog/utils";
import { useRouter } from "next/router";

export default function PostDetailsPage() {
  const { query, push } = useRouter();

  const {
    data: post,
    isError,
    isLoading,
  } = api.posts.getById.useQuery(
    // TODO: remove typ assertion
    { postId: query.postId as string },
    { enabled: !!query.postId }
  );

  const { mutate: deletePost } = api.posts.delete.useMutation({
    onSuccess: () => {
      void push({
        pathname: "/",
      });
    },
  });

  // TODO: move to wrapper for handling these states
  if (isError) return <p>Error</p>;

  if (isLoading) return <p>loading</p>;

  if (!post) return <p>No post found</p>;

  return (
    <PageWrapper>
      <Post.CardDetails
        post={post}
        onPostEditClick={() =>
          push({
            pathname: "/posts/edit/[postId]",
            query: { postId: post.id },
          })
        }
        onPostDeleteClick={() => deletePost({ postId: post.id })}
      />
    </PageWrapper>
  );
}
