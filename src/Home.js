import { useStoreState } from "easy-peasy";
import React from "react";

import Posts from "./Posts";

const Home = ({ isLoading, errorMsg }) => {
  const filteredPosts = useStoreState((state) => state.filteredPosts);
  return (
    <main className="mainpage">
      {isLoading && <p>Loading...</p>}
      {!isLoading && errorMsg && <p> {errorMsg} </p>}
      {!isLoading &&
        !errorMsg &&
        (filteredPosts.length ? (
          <Posts posts={filteredPosts} />
        ) : (
          <p>there is no post</p>
        ))}
    </main>
  );
};

export default Home;
