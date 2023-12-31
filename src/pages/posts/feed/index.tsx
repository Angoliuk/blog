import { type Post as PostType } from "@prisma/client";
import { List, type ListItem, PageWrapper, Post } from "blog/components";
import { api } from "blog/utils";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export default function PostsFeedPage() {
  const { push } = useRouter();

  const {
    data: postsResponse,
    isFetching,
    isLoading,
    isRefetching,
    fetchNextPage,
    isError,
  } = api.posts.get.useInfiniteQuery(
    {},
    { getNextPageParam: (prevPage) => prevPage.offset }
  );

  const posts = useMemo(
    () => postsResponse?.pages.flatMap((page) => page.posts),
    [postsResponse?.pages]
  );

  const postItem: ListItem<PostType> = useCallback(
    ({ item }) => (
      <Post.Card
        post={item}
        onPostClick={() =>
          push({
            query: { postId: item.id },
            pathname: "/posts/details/[postId]",
          })
        }
      />
    ),
    [push]
  );

  return (
    <PageWrapper>
      <List
        className="pb-5"
        keyExtractor={(elem) => elem.item.id}
        listItem={postItem}
        data={posts}
        isContentWrapped
        emptyComponent={
          <p className="m-auto w-full text-center">No posts found</p>
        }
        isFetchingMore={isFetching}
        isFirstLoading={isLoading}
        isRefetching={isRefetching}
        loadMore={fetchNextPage}
        isError={isError}
      />
    </PageWrapper>
  );
}
