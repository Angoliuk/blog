import { PageWrapper } from "blog/components";
import { api } from "blog/utils";
import { useRouter } from "next/router";

import { Post } from "blog/components";

export default function EditPostPage() {
  const {
    push,
    query: { postId },
  } = useRouter();

  const {
    data: post,
    isError,
    isLoading,
  } = api.posts.getById.useQuery(
    // TODO: remove typ assertion
    { postId: postId as string },
    { enabled: !!postId }
  );

  const { mutate: editPost, isLoading: isSubmitLoading } =
    api.posts.edit.useMutation();

  const { control, handleSubmit } = Post.useForm(post);

  const handleFormSubmit = handleSubmit((values) => {
    if (!post) return;
    editPost({ postId: post?.id, updatedValues: values });
    void push("/");
  });

  // TODO: move to wrapper for handling these states
  if (isError) return <p>Error</p>;

  if (isLoading) return <p>loading</p>;

  if (!post) return <p>No post found</p>;

  return (
    <PageWrapper>
      <Post.Form
        isLoading={isSubmitLoading}
        onSubmit={handleFormSubmit}
        control={control}
      />
    </PageWrapper>
  );
}
