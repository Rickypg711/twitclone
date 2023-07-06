import NewTweetForm from "~/components/NewTweetForm";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2 ">
        <h1 className="mb-2 px-4 text-lg font-bold">HOME</h1>
      </header>

      <NewTweetForm />
    </>
  );
}

function RecentTweets() {
  const tweets = [];
  return <InfiniteTweetList tweets={tweets} />;
}
