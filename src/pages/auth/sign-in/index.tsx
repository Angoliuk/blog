import Link from "next/link";
import { Auth, PageWrapper } from "blog/components";
import { signIn } from "next-auth/react";
import { useSessionChecker } from "blog/hooks";

export default function SignIn() {
  useSessionChecker({
    loggedOutCheck: true,
    loggedInCheck: false,
  });
  const { control, handleSubmit } = Auth.useForm();

  const handleFormSubmit = handleSubmit((values) =>
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    })
  );

  return (
    <PageWrapper contentWrapperClassName="justify-center m-auto w-full max-w-3xl">
      <p className="mb-4 mt-5 text-center text-2xl text-slate-800">Login</p>
      <Auth.Form control={control} onSubmit={handleFormSubmit} />
      <p className="mt-5 text-right text-base text-slate-400">
        <Link href="/auth/sign-up">Do not have an account? Register here</Link>
      </p>
    </PageWrapper>
  );
}
