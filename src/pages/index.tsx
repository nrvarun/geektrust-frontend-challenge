import SearchContextProvider from "context/SearchContext";
import Head from "next/head";
import SearchListing from "./Home/SearchListing";

export default function Home() {
  return (
    <div>
      <Head>
        <title>GeekTrust Frontend Challenge - Admin UI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchContextProvider>
          <SearchListing />
        </SearchContextProvider>
      </main>
    </div>
  );
}
