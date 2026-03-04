import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './messageBoard.scss';

function ArticleListInit() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/api/postAll?limit=3');
      setData(res.data.data);
    }
    fetchData();
  }, []);

  return (data || []).map((item, index) => (
    <div className="posts-item" onClick={() => navigate(`/posts/${item._id}`)} key={index}>
      <div className="posts-title">
        <span className="title">{item.title}</span>
        <span className="time">发布时间：{item.createTime || '暂无'}</span>
      </div>
      <div className="posts-cont" title={item.description}>
        {item.description}
      </div>
    </div>
  ));
}

function MessageBoard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', message: '' });

  function setFormValue(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    if (formData.email && formData.message) {
      await axios.post('/api/postContent', {
        title: formData.email,
        description: formData.message,
        contents: formData.message,
        createTime: new Date().toISOString(),
      });
      alert('提交成功');
      navigate('/index');
    }
  }

  return (
    <div className="message-board">
      <div className="message-board-left">
        <p className="form-title">邮箱：</p>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormValue('email', e.target.value)}
        />
        <p className="form-title">发布内容：</p>
        <input
          type="text"
          value={formData.message}
          onChange={(e) => setFormValue('message', e.target.value)}
        />
        <div>
          <button onClick={handleSubmit}>提交</button>
        </div>
      </div>
      <div className="message-board-right">
        <p className="message-board-right-title">最新文章</p>
        <ArticleListInit />
      </div>
    </div>
  );
}

export default MessageBoard;
