import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import api from "./api/posts";

const PostDetail = ({}) => {
  const posts = useStoreState((state) => state.posts);
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const { id } = useParams();
  const history = useHistory();
  const selectedPost = posts.find((post) => {
    return post.id.toString() === id;
  });

  const handleDelete = async (id) => {
    deletePost(id);
    history.push("/");
  };

  return (
    <main className="post">
      {selectedPost && (
        <>
          <h1>{selectedPost.title}</h1>
          <p>{selectedPost.datetime}</p>
          <p>{selectedPost.body}</p>
          <button
            className="Delete"
            onClick={() => handleDelete(selectedPost.id)}
          >
            Delete
          </button>
          <Link to={`/edit/${id}`}>
            <button className="Delete">Edit</button>
          </Link>
        </>
      )}
      {!selectedPost && (
        <>
          <h1>Post not found</h1>
          <p>Well, thats disappinting</p>
          <Link to="/">Visit our homepage</Link>
        </>
      )}
    </main>
  );
};

export default PostDetail;
