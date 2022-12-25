import React, { useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

import { useStoreActions, useStoreState } from "easy-peasy";

const NewPost = () => {
  // const { posts, setPosts } = useContext(DataContext);
  const posts = useStoreState((state) => state.posts);
  const savePost = useStoreActions((actions) => actions.savePost);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title, datetime, body };
    savePost(newPost);
    history.push("/");
  };

  return (
    <form className="form" onSubmit={handlePostSubmit}>
      <h1>New Post</h1>
      <label htmlFor="title">title</label>
      <input
        type="text"
        id="title"
        autoFocus
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="body">body</label>
      <textarea
        id="body"
        value={body}
        required
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default NewPost;
