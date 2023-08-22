import { PageWrapper } from "blog/components";
import { type ReactNode } from "react";

export default function SignInPage() {
  return <></>;
}

SignInPage.getLayout = function getLayout(page: ReactNode) {
  return <PageWrapper>{page}</PageWrapper>;
};
