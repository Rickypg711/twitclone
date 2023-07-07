import NewTweetForm from "~/components/NewTweetForm";
import { api } from "~/utils/api";
import InfiniteTweetList from "~/components/InfiniteTweetList";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2 ">
        <h1 className="mb-2 px-4 text-lg font-bold">HOME</h1>
      </header>

      <NewTweetForm />
      <RecentTweets />
    </>
  );
}

function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage ?? false} // Use `false` as default value
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}
