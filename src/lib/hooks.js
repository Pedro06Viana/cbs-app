import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error } = useSWR("/api/user", fetcher);

  const user = data?.user
    ? {
        uid: data.user[0].uid,
        nome: data.user[0].nome,
        posto: data.user[0].posto,
        nib: data.user[0].nib,
        avatar: data.user[0].avatar,
        roles: data.user[0].roles,
      }
    : undefined;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : { user, finished };
}
