import { action, useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setFilteredPosts = useStoreActions(
    (actions) => actions.setFilteredPosts
  );

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filteredPosts.reverse());
  }, [posts, search, setFilteredPosts]);

  return (
    <nav className="nav">
      <label htmlFor="search">Search for:</label>
      <input
        id="search"
        type="text"
        placeholder="Search Posts"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>

        <Link to="/post">
          <li>Post</li>
        </Link>

        <Link to="/about">
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
