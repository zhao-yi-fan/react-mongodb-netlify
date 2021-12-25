import React from "react"
import "./home.css"
import { postsJson } from '../postsData'
import { useNavigate } from "react-router-dom"


function ArticleListInit () {
  const navigate = useNavigate()
  function handleClick (id) {
    navigate(`/posts/${id}`)
  }

  return (postsJson.map((item, index) =>
    <div className="posts-item" onClick={() => handleClick(item.id)} key={index}>
      <div className="posts-title">{item.title}</div>
      <div className="posts-cont" title={item.content}>{item.content}</div>
    </div>
  ))
}

function Home () {
  return (
    <div className="home">
      <div className="banner">
        <p>传统文化的继承和发扬，不只是新建博物馆或保存声音与影像。</p>
        <p>应该是一种融入人群的生活方式和行为准则。</p>
      </div>
      <div className="posts-list">
        {
          ArticleListInit()
        }
      </div>
    </div>
  )
}


export default Home


