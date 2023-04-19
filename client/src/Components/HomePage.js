import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import Search from "./Search";
import AddCharacterForm from "./AddCharacterForm";
import { useSelector } from "react-redux";

function HomePage({ allPosts, updateAllPosts, allTags }) {
  const [addPost, setAddPost] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const characters = useSelector(state => state.characters);
  const [addCharacter, setAddCharacter] = useState(false);
  const [characterCreated, setCharacterCreated] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

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

        {addPost ? <AddPostForm updateAllPosts={updateAllPosts} setAddPost={setAddPost} setPostCreated={setPostCreated} /> : null}
        
        {addPost ? null : 
          <button 
            className="btn-confirm place-self-center" 
            onClick={
              e => {
                setAddPost(true)
                setAddCharacter(false)
                setCharacterCreated(false)
                setPostCreated(false)
              }
            }>Create a Post?</button>}

        {addCharacter ? 
          <>
            <AddCharacterForm setAddCharacter={setAddCharacter} setCharacterCreated={setCharacterCreated} /> 
            <button 
              className="btn-cancel place-self-center" 
              onClick={
                e => setAddCharacter(false)
              }>Cancel</button>
          </>
          : null}

        {addPost && characters.length === 0 ? 
          <button 
            className="btn-confirm place-self-center" 
            onClick={
              e => {
                setAddCharacter(true);
                setAddPost(false);
              }
            }>Add a Character?</button> :
          null}

        {addPost && characters.length > 0 ?
          <button className="btn-cancel place-self-center" onClick={e => setAddPost(false)} >Cancel</button> : null}

        {characterCreated ? <h2 className="text-rose-500">Your character has been created!</h2> : null}

        {postCreated ? <h2 className="text-rose-500">Your post has been created!</h2> : null}

        {
        doSearch ? 
          <button className="btn-cancel place-self-center" onClick={e => {
            setDoSearch(false)
            setSearchTag("")
          }}>Cancel</button> : 
          <button 
            className="btn-confirm place-self-center" 
            onClick={
              e => {
                setDoSearch(true)
                setCharacterCreated(false)
                setPostCreated(false)
              }
          }>Search by Category?</button>
        }
      <div className="post-list">
        {displayPosts}
      </div>
    </>
  )
}

export default HomePage;