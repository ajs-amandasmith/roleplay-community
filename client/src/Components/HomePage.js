import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";

function HomePage({ allPosts, updateAllPosts, allTags }) {
  const [addPost, setAddPost] = useState(false);

  console.log(allPosts)

  const displayPosts = allPosts.map(post => (
    <div 
      key={post.id} 
      className="post-list-item"
    >
      <Link to={`/posts/${post.id}`}>
        <div className="bg-indigo-500 m-2 border-2 border-indigo-400 hover:opacity-70 transition shadow">
          <h3 className="post-list-title">{post.title}</h3>
        </div>
      </Link>
      <div className="post-list-post">
        <p className="truncate">{post.post}</p>
      </div>
      <div className="post-list-info">
        <p className="post-character">By: {post.character.name}</p>
        <p className="post-user">User: {post.user.username}</p>
        <p className="post-comments">Comments: {post.comments.length}</p>
      </div>
    </div>
  ))

  return (
    <>
      <h2>Available Posts</h2>
      {addPost ? <AddPostForm updateAllPosts={updateAllPosts} setAddPost={setAddPost} /> : null}
      {addPost ? 
        <button 
          className="btn-cancel place-self-center" 
          onClick={
            e => setAddPost(false)
          }>Cancel
        </button> : 
        <button 
          className="btn-confirm place-self-center" 
          onClick={
            e => setAddPost(true)
          }>Create a Post?
        </button>}
      <div className="post-list">
        {displayPosts}
      </div>
    </>
  )
}

export default HomePage;