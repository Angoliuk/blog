import Link from "next/link";
import { api } from "blog/utils";
import { useRouter } from "next/router";
import { Auth, PageWrapper } from "blog/components";
import { useSessionChecker } from "blog/hooks";

export default function SignUp() {
  useSessionChecker({
    loggedOutCheck: true,
    loggedInCheck: false,
  });
  const { push } = useRouter();

  const { control, handleSubmit } = Auth.useForm();

  const { mutate: signUp, isLoading } = api.auth.signUp.useMutation({
    onSuccess: () => {
      void push("/posts/feed");
    },
  });

  const handleFormSubmit = handleSubmit((values) => signUp(values));

  return (
    <PageWrapper contentWrapperClassName="m-auto w-full max-w-3xl justify-center">
      <p className="mb-4 mt-5 text-center text-2xl text-slate-800">Register</p>
      <Auth.Form
        control={control}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
      />
      <p className="mt-5 text-right text-base text-slate-400">
        <Link href="/auth/sign-in">Already registered? Login here</Link>
      </p>
    </PageWrapper>
  );
}
