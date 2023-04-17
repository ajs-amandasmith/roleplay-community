import React from "react";
import { Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";

function HomePage({ allPosts, updateAllPosts, allTags }) {

  const displayPosts = allPosts.map(post => (
    <div key={post.id} style={{ width: '200px'}}>
      <Link to={`/posts/${post.id}`}><h4 className="text-2xl">{post.title}</h4></Link>
      <p>By: {post.character.name}</p>
      <p className="truncate">{post.post}</p>
      <p>Comments: {post.comments.length}</p>
      <br></br>
    </div>
  ))

  return (
    <div>
      <h2 className="text-3xl">Available Posts</h2>
      <AddPostForm updateAllPosts={updateAllPosts} allTags={allTags} />
      <br></br>
      {displayPosts}
    </div>
  )
}

export default HomePage;