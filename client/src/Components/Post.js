import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import AddPostImage from "./AddPostImage";
import UpdatePostForm from "./UpdatePostForm";
import { useSelector } from "react-redux";
import DeletePost from "./DeletePost";

function Post({ updateAllPosts }) {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState({});
  const [title, setTitle] = useState("")
  const [character, setCharacter] = useState({});
  const [postUser, setPostUser] = useState({});
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    setErrors([]);
    fetch(`/posts/${id}`)
      .then(r => {
        if (r.ok) {
          r.json().then(post => {
            setCurrentPost(post);
            setCharacter(post.character);
            setPostUser(post.user);
            setTitle(post.title);
          });
        } else {
          r.json().then(err => setErrors(err));
        }
      })
  }, [id])

  function updatePost(post) {
    setCurrentPost(post);
  }

  console.log(currentPost.comments);

  return (
    <div>
      {
        user.id === postUser.id ? 
        <AddPostImage currentPost={currentPost} updatePost={updatePost} /> 
        : null
      }
      {
        user.id === postUser.id ? 
        <UpdatePostForm currentPost={currentPost} updatePost={updatePost} title={title} setTitle={setTitle} character={character} setCharacter={setCharacter} /> 
        : null
      }
      {
        user.id === postUser.id ?
        <DeletePost currentPost={currentPost} updateAllPosts={updateAllPosts} />
        : null
      }
      <div>
        <img className="h=[100px] w-[100px] object-cover" src={currentPost.image} alt='post-image' />
        <h1 className="text-3xl">{title}</h1>
        <h3 className="text-2xl">{character.name}</h3>
        <h4>{postUser.username}</h4>
        <p>{currentPost.post}</p>
      </div>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
    </div>
  )
}

export default Post;