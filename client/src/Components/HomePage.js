import React from "react";

function HomePage({ allPosts }) {

  const displayPosts = allPosts.map(post => (
    <div>
      <h4 className="text-2xl">{post.title}</h4>
      <p>By: {post.character.name}</p>
      <p>Comments: {post.comments.length}</p>
      <br></br>
    </div>
  ))

  console.log(allPosts)

  return (
    <div>
      <h2 className="text-3xl">Available Posts</h2>
      <br></br>
      {displayPosts}
    </div>
  )
}

export default HomePage;