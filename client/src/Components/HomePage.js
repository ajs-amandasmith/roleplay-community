import React from "react";
import { Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";

function HomePage({ allPosts }) {

  const displayPosts = allPosts.map(post => (
    <div key={post.id}>
      <Link to={`/posts/${post.id}`}><h4 className="text-2xl">{post.title}</h4></Link>
      <p>By: {post.character.name}</p>
      <p>Comments: {post.comments.length}</p>
      <br></br>
    </div>
  ))

  return (
    <div>
      <h2 className="text-3xl">Available Posts</h2>
      <AddPostForm />
      <br></br>
      {displayPosts}
    </div>
  )
}

export default HomePage;