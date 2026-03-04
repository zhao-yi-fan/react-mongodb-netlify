import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './posts.scss';

function PostDetail() {
  const [obj, setObj] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/api/getById?id=${id}`);
      setObj(res.data.data);
    }
    fetchData();
  }, [id]);

  return (
    <div className="posts-detail">
      <h1 className="posts-title">
        <span className="title">{obj.title}</span>
        <span className="time">发布时间：{obj.createTime || '暂无'}</span>
      </h1>
      <p className="posts-content">{obj.contents}</p>
    </div>
  );
}

export default PostDetail;
