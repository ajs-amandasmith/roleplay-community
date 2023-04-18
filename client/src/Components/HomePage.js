import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import Search from "./Search";

function HomePage({ allPosts, updateAllPosts, allTags }) {
  const [addPost, setAddPost] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [searchTag, setSearchTag] = useState("");

  let posts = allPosts.map(post => {
    if (searchTag === "") {
      return post;
    } else {
      return {...post, tags: post.tags.filter(tag => (tag.tag.includes(searchTag.replace(/ /g, '-').toLowerCase())))}
    }
  }).filter(post => {
    if (searchTag === "" ) {
      return post;
    } else {
      return post.tags.length > 0
    }
   
  })

  const displayPosts = posts.map(post => (
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
        <p className="post-list-character">By: {post.character.name}</p>
        <p className="post-list-user">User: {post.user.username}</p>
        <p className="post-list-comments">Comments: {post.comments.length}</p>
      </div>
    </div>
  ))

  return (
    <>
      <h2>Available Posts</h2>
      {doSearch ? <Search setDoSearch={setDoSearch} allPosts={allPosts} allTags={allTags} setSearchTag={setSearchTag} /> : null}
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
        {
        doSearch ? 
          <button className="btn-cancel place-self-center" onClick={e => {
            setDoSearch(false)
            setSearchTag("")
          }}>Cancel</button> : 
          <button className="btn-confirm place-self-center" onClick={e => setDoSearch(true)}>Search by Tag?</button>
        }
      <div className="post-list">
        {displayPosts}
      </div>
    </>
  )
}

export default HomePage;