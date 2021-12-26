import React, { useState, /* useEffect */ } from "react"
import axios from 'axios';
import "./messageBoard.css"


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
      contents: formData.message
    });
    console.log(res.data.data, 'res.data.data==');

  }

  return (
    <div className="message-board">

      <input type="email" value={formData.email} onChange={(e) => setFormValue('email', e.target.value)} />
      <input type="text" value={formData.message} onChange={(e) => setFormValue('message', e.target.value)} />
      <button onClick={() => handleClick()}>提交</button>
    </div>

  )
}


export default InitDetail


