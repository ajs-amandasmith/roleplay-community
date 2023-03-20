import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState();
  const [errors, setErrors] = useState([]);

  console.log('id', id)

  useEffect(() => {
    fetch(`/posts/${id}`)
      .then(r => {
        if (r.ok) {
          r.json().then(post => setCurrentPost(post));
        } else {
          r.json().then(err => setErrors(err));
        }
      })
  }, [])

  console.log(currentPost)
  console.log('error', errors)
  
  return (
    <div>{currentPost.title}</div>
  )
}

export default Post;