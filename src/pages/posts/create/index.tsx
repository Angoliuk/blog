import { PageWrapper, Post } from "blog/components";
import { api } from "blog/utils";
import { useRouter } from "next/router";

export default function CreatePostPage() {
  const { push } = useRouter();

  const { control, handleSubmit } = Post.useForm();

  const { mutate: createPost, isLoading: isSubmitLoading } =
    api.posts.create.useMutation();

  const handleFormSubmit = handleSubmit((values) => {
    createPost(values);
    void push("/");
  });

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
