import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

const EditPost = () => {
  const posts = useStoreState((state) => state.posts);
  const editPost = useStoreActions((actions) => actions.editPost);
  const { id } = useParams();
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const history = useHistory();

  const post = posts.find((post) => post.id.toString() === id);

  const handlePostEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    editPost(updatePost);
    history.push(`/post/${id}`);
  };

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      {
        <>
          {editTitle} && (<h1>Edit Post</h1>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            autoFocus
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label htmlFor="body">body</label>
          <textarea
            id="body"
            value={editBody}
            required
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button type="submit" onClick={() => handlePostEdit(id)}>
            Edit Post
          </button>
          )
        </>
      }
      {!editTitle && (
        <>
          <h1>Post not found</h1>
          <p>Well, thats disappinting</p>
          <Link to="/">Visit our homepage</Link>
        </>
      )}
    </form>
  );
};

export default EditPost;
