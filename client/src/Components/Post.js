import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import AddPostImage from "./AddPostImage";
import UpdatePostForm from "./UpdatePostForm";
import { useSelector } from "react-redux";
import DeletePost from "./DeletePost";
import AddCommentForm from "./AddCommentForm";
import AddTagForm from "./AddTagForm";

function Post({ updateAllPosts, allTags }) {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState({});
  const [title, setTitle] = useState("")
  const [character, setCharacter] = useState({});
  const [postUser, setPostUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const user = useSelector(state => state.user.user)
  const [editPost, setEditPost] = useState(false);
  const [addComment, setAddComment] = useState(false);

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
            setComments(post.comments);
            setTags(post.tags);
          });
        } else {
          r.json().then(err => setErrors(err));
        }
      })
  }, [id])

  useEffect(() => {
    updateTags();
  // eslint-disable-next-line  
  }, [tags])

  function updatePost(post) {
    setCurrentPost(post);
  }

  function updateComments(comment) {
    const newComments = [...comments, comment];
    const newPost = currentPost
    newPost.comments = newComments
    updateAllPosts(newPost, "update")
    setComments(newComments);
  }

  function updateTags() {
    const newTags = allTags.filter(tag => {
      return tags.every(el => {
        return el.id !== tag.id
      })
    })
    setAvailableTags(newTags)
  }

  function updatePostTags(tag, id) {
    const newTags = [...tags, {tag: tag, id: id}];
    setTags(newTags);
  }

  const displayComments = comments.map(comment => (
    <div key={comment.id} className="post-list-item">
      <p className="post-list-post">{comment.comment}</p>
      <p className="post-list-character">By: {comment.character.name}</p>
      <p className="post-list-user">User: {comment.user.username}</p>
    </div>
  ))

  const displayTags = tags.map(tag => (
    <div key={tag.id}>
      <p className="capitalize text-xs text-white">{tag.tag.replace(/-/g, ' ')}</p>
    </div>
  ))

  return (
    <>
    <h1>{title}</h1>
    <h3 className="justify-center">By: {character.name}</h3>
    <h4 className="justify-center">User: {postUser.username}</h4>
    <div className="relative flex flex-row justify-center">
      {
        user.id === postUser.id && !editPost ?
          <button className="btn-confirm place-self-center mt-10" onClick={e => (setEditPost(true))}>Edit Post?</button> :
          null  
      }
      {
        user.id === postUser.id && editPost ?
          <button className="btn-cancel place-self-center mt-10" onClick={e => (setEditPost(false))}>Cancel Edit</button> :
          null  
      }
      {
        user.id === postUser.id ?
        <DeletePost currentPost={currentPost} updateAllPosts={updateAllPosts} />
        : null
      }
    </div>
    <div className="flex flex-row relative justify-center bg-indigo-500 rounded w-1/2 place-self-center">
      <p className="flex absolute left-0 text-white">Tags:</p>
      {displayTags}
    </div>
    <div className="div-post mt-0">
      {currentPost.image ? <img className="h=[500px] w-[500px] place-self-center object-cover" src={currentPost.image} alt='post' /> : null}
      <div className="bg-indigo-500 m-2">
        <p className="post-post">{currentPost.post}</p>
      </div>        
    </div>
    {
      addComment ? 
        <button className="btn-cancel place-self-center" onClick={e => setAddComment(false)}>Cancel Comment</button>: 
        <button className="btn-confirm place-self-center" onClick={e => setAddComment(true)}>Add a Comment?</button>
    }
      {addComment ? <AddCommentForm currentPost={currentPost} updateComments={updateComments} updatePost={updatePost} setAddComment={setAddComment} /> : null }
    {
      editPost ? <AddPostImage currentPost={currentPost} updatePost={updatePost} setEditPost={setEditPost} /> : null
    }
    {
      editPost ?
      <AddTagForm currentPost={currentPost} updatePostTags={updatePostTags} availableTags={availableTags} setEditPost={setEditPost} />
      : null
    }
    {
      editPost ? 
      <UpdatePostForm currentPost={currentPost} updatePost={updatePost} title={title} setTitle={setTitle}character={character} setCharacter={setCharacter} setEditPost={setEditPost} /> 
      : null
    }
    <div className="post-list">
      {displayComments}
    </div>
    
    
    
        

       
      
      {/*
      
      
     
   
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
      */}
    </>
  )
}

export default Post;