import React from "react";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  return (
    <div className="post post-child">
      <Link to={`/post/${post.id}`}>
        <h2 className="postDetail"> {post.title} </h2>
      </Link>
      <p>{post.datetime}</p>
      <p>
        {post.body.length < 25 ? post.body : `${post.body.slice(0, 25)}...`}
      </p>
    </div>
  );
};

export default Post;
