import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState({});
  const [comments, setComments] = useState([]);
  const [character, setCharacter] = useState([]);
  const [user, setUser] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  console.log('id', id)

  useEffect(() => {
    // setIsLoading(true);
    console.log('i fire once')
    fetch(`/posts/${id}`)
      .then(r => {
        // setIsLoading(false);
        if (r.ok) {
          r.json().then(post => {
            setCurrentPost(post);
            setComments(post.comments);
            setCharacter(post.character);
            setUser(post.user);
          });
        } else {
          r.json().then(err => setErrors(err));
        }
      })
  }, [id])

  console.log('post', currentPost)
  // console.log('error', errors)
  // console.log('comments', comments);
  // console.log('character', currentPost.character.name)

  const displayComments = comments.map(comment => (
    <div>

    </div>
  ))
  
  return (
    <div>
      <div>
        <h1 className="text-3xl">{currentPost.title}</h1>
        <h3 className="text-2xl">{character.name}</h3>
        <h4>{user.username}</h4>
      </div>
      {/* {isLoading ? "Page Loading" :
      <div>
        <h1 className="text-3xl">{currentPost.title}</h1>
        <h3 className="text-2xl">{currentPost.character.name}</h3>
        <h4>{currentPost.user.username}</h4>
        {comments.length === 0 ? "No Comments" : displayComments}
      </div>
      } */}
    </div>
  )
}

export default Post;