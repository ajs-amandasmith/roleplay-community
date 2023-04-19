import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddAvatarForm from "./AddAvatarForm";
import { Link } from "react-router-dom";
import blank_avatar from '../images/blank_avatar.png';

function ProfilePage() {
  const user = useSelector(state => state.user.user);
  const status = useSelector(state => state.user.status);
  const characters = useSelector(state => state.characters);
  const posts = useSelector(state => state.posts);
  const [addAvatar, setAddAvatar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "done"})
  }, [])

  const displayCharacters = characters.map(character => (
    <div key={character.id} className="post-list-item">
      <img className="h=[100px] w-[100px] object-cover" alt="character" src={typeof character.avatar === "string" ? character.avatar : blank_avatar}/>
      <Link to={`/characters/${character.id}`}>
        <p className="post-list-character">{character.name}</p>
      </Link>
    </div>
  ))

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

  function handleAddAvatar() {
    setAddAvatar(!addAvatar)
  }

  return (
    <div>
      {status === "loading" ? "Loading..." :
      <div>
        <h1 className="mt-1 text-5xl font-medium leading-tight">Welcome, {user.username}!</h1>
        <h2 className="mt-1 text-4xl">You can update your profile settings here!</h2>
        <img className="h=[100px] w-[100px] object-cover" src={typeof user.avatar === "string" ? user.avatar : blank_avatar} alt='user profile' />
        {addAvatar ? 
          <button className="btn-cancel" onClick={handleAddAvatar}>Cancel</button> :
          <button className="btn-confirm" onClick={handleAddAvatar}>{user.avatar ? "Update Avatar?" : "Add Avatar?"}</button>
        }
        {addAvatar ? <AddAvatarForm addAvatar={addAvatar} setAddAvatar={setAddAvatar} /> : null}
        <div className="grid grid-cols-2">
          <div className="post-list">
            <h2>My Characters: </h2>
            {displayCharacters}
          </div>
          <div className="post-list">
            <h2>My Posts: </h2>
            {displayPosts}
          </div>
        </div>
       
      </div>
    }
    </div>
  )
}

export default ProfilePage;