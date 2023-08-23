import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export type UseSessionChecker = {
  loggedInCheck?: boolean;
  loggedInCheckRedirect?: string;
  loggedOutCheck?: boolean;
  loggedOutCheckRedirect?: string;
};

export const useSessionChecker = (
  {
    loggedOutCheck,
    loggedInCheck,
    loggedOutCheckRedirect,
    loggedInCheckRedirect,
  }: UseSessionChecker = {
    loggedOutCheck: false,
    loggedInCheck: true,
  }
) => {
  const { push } = useRouter();
  const { status } = useSession();

  if (loggedInCheck && status === "unauthenticated")
    void push(loggedInCheckRedirect ?? "/auth/sign-in");

  if (loggedOutCheck && status === "authenticated")
    void push(loggedOutCheckRedirect ?? "/posts/feed");
};
