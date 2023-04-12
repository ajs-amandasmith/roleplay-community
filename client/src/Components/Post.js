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

  console.log(tags)

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
    <div key={comment.id}>
      <p>{comment.comment}</p>
      <h5>{comment.user.username}</h5>
      <h5>{comment.character.name}</h5>
    </div>
  ))

  const displayTags = tags.map(tag => (
    <div key={tag.id}>
      <p>{tag.tag.replace(/-/g, ' ')}</p>
    </div>
  ))

  return (
    <div>
      {
        user.id === postUser.id ? 
        <AddPostImage currentPost={currentPost} updatePost={updatePost} /> 
        : null
      }
      {
        user.id === postUser.id ?
        <AddTagForm currentPost={currentPost} updatePostTags={updatePostTags} availableTags={availableTags} />
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
        <img className="h=[100px] w-[100px] object-cover" src={currentPost.image} alt='post' />
        <h1 className="text-3xl">{title}</h1>
        <h3 className="text-2xl">{character.name}</h3>
        <h4>{postUser.username}</h4>
        <p>{currentPost.post}</p>
        {displayComments}
        {displayTags}
      </div>
      {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
      <AddCommentForm currentPost={currentPost} updateComments={updateComments} updatePost={updatePost} />
    </div>
  )
}

export default Post;