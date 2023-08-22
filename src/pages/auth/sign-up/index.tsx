import { PageWrapper } from "blog/components";
import { type ReactNode } from "react";

export default function SignUpPage() {
  return <></>;
}

SignUpPage.getLayout = function getLayout(page: ReactNode) {
  return <PageWrapper>{page}</PageWrapper>;
};
