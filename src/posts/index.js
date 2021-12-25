import { useParams } from "react-router-dom";
import React from "react"
import { postsJson } from '../postsData'
import "./posts.css"

function InitDetail () {
  let params = useParams();
  console.log(params, 'params===');
  const { id } = params;
  console.log(postsJson,'postsJson===');
  const obj = postsJson.find(item => item.id === +id);

  return (
    <div className="posts-detail">
      <h1 className="posts-title">
        {obj.title}
      </h1>
      <p className="posts-content">
        {obj.content}
      </p>
    </div>

  )
}


export default InitDetail


