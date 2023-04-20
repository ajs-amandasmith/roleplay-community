import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddAvatarForm from "./AddAvatarForm";
import { Link } from "react-router-dom";
import blank_avatar from '../images/blank_avatar.png';
import AddCharacterForm from "./AddCharacterForm";
import AddPostForm from "./AddPostForm";

function ProfilePage({ updateAllPosts }) {
  const user = useSelector(state => state.user.user);
  const status = useSelector(state => state.user.status);
  const characters = useSelector(state => state.characters);
  const posts = useSelector(state => state.posts);
  const [addAvatar, setAddAvatar] = useState(false);
  const dispatch = useDispatch();
  const [addCharacter, setAddCharacter] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [characterCreated, setCharacterCreated] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

  useEffect(() => {
    dispatch({ type: "done"})
  // eslint-disable-next-line 
  }, [])

  const displayCharacters = characters.map(character => (
    <div key={character.id} className="post-list-item">
      <Link to={`/characters/${character.id}`}>
        <img className="h=[100px] w-[100px] object-cover" alt="character" src={typeof character.avatar === "string" ? character.avatar : blank_avatar}/>
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
    <>
      {status === "loading" ? "Loading..." :
      <>
        <h1>Welcome, {user.username}!</h1>
        <h2 className="mt-1 text-4xl">You can update your profile settings here!</h2>
        {characters.length === 0 ? <h2 className="text-rose-500">Please create a character!</h2> : null}
        <img className="h=[100px] w-[100px] object-cover place-self-center mt-4" src={typeof user.avatar === "string" ? user.avatar : blank_avatar} alt='user profile' />
        {addAvatar ? 
          <button className="btn-cancel place-self-center" onClick={handleAddAvatar}>Cancel</button> :
          <button className="btn-confirm place-self-center" onClick={handleAddAvatar}>{user.avatar ? "Update Avatar?" : "Add Avatar?"}</button>
        }
        {addAvatar ? <AddAvatarForm addAvatar={addAvatar} setAddAvatar={setAddAvatar} /> : null}
        <div className="grid grid-cols-2">
          
          <div className="post-list">
            {addCharacter ? <AddCharacterForm setAddCharacter={setAddCharacter} setCharacterCreated={setCharacterCreated} /> : null }
            {
              addCharacter ? 
                <button className="btn-cancel" onClick={e => setAddCharacter(false)}>Cancel</button> : 
                <button className="btn-confirm" onClick={e => setAddCharacter(true)}>Add a Character?</button>
            }
            <h2>My Characters: </h2>
            {displayCharacters}
          </div>

          <div className="post-list">
            {addPost ? <AddPostForm setAddPost={setAddPost} updateAllPosts={updateAllPosts} setPostCreated={setPostCreated} /> : null}
            {
              addPost ? 
                <button className="btn-cancel" onClick={e => setAddPost(false)}>Cancel</button> : 
                <button className="btn-confirm" onClick={e => setAddPost(true)}>Add a Post?</button>
            }
            <h2>My Posts: </h2>
            {displayPosts}
          </div>
        </div>
       
      </>
    }
    </>
  )
}

export default ProfilePage;