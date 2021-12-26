import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import "./messageBoard.css"


function ArticleListInit () {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  function handleClick (id) {
    navigate(`/posts/${id}`)
  }
  useEffect(() => {
    async function fetchData () {
      let res = await axios.get('/.netlify/functions/postAll');
      console.log(res.data.data, 'res.data.data==');
      setData(res.data.data.reverse().slice(0, 3));
    }
    fetchData()
  }, [])


  return ((data || []).map((item, index) =>
    <div className="posts-item" onClick={() => handleClick(item._id)} key={index}>
      <div className="posts-title">
        <span className="title">{item.title}</span>
        <span className="time">发布时间：{item.createTime || '暂无'}</span>
      </div>
      <div className="posts-cont" title={item.description}>{item.description}</div>
    </div>
  ))
}

function InitDetail () {
  const [formData, setFormData] = useState({ email: '', message: '' });

  /* useEffect(() => {
    async function fetchData () {

      let res = await axios.get(`/.netlify/functions/getById?id=${id}`);
      console.log(res.data.data, 'res.data.data==');
      setObj({ ...res.data.data[0] });

    }
    fetchData()
  }, [id]) */
  function setFormValue (key, value) {
    setFormData({
      ...formData,
      [key]: value
    })
  }

  async function handleClick () {
    console.log(formData, 'formData===');
    let res = await axios.post(`/.netlify/functions/postContent`, {
      title: formData.email,
      description: formData.message,
      contents: formData.message,
      createTime: new Date().toISOString()
    });
    console.log(res.data.data, 'res.data.data==');

  }

  return (
    <div className="message-board">
      <div className="message-board-left">
        <input type="email" value={formData.email} onChange={(e) => setFormValue('email', e.target.value)} />
        <input type="text" value={formData.message} onChange={(e) => setFormValue('message', e.target.value)} />
        <button onClick={() => handleClick()}>提交</button>

      </div>
      <div className="message-board-right">
        <p className="message-board-right-title">最新文章</p>
        {
          ArticleListInit()
        }
      </div>
    </div>

  )
}


export default InitDetail


