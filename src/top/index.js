import { useNavigate } from "react-router-dom";
import React from "react"
import "./top.css"

function NavList () {
  let navigate = useNavigate();
  return (
    <>
      <span onClick={() => navigate('/index')}>主页</span>
      <span onClick={() => navigate('/messageBoard')}>留言板</span>
    </>

  )
}
export default class Top extends React.Component {

  render () {
    return (
      <div className="top">{
        NavList()
      }

        {/* <NavLink to="/index" className="link">主页</NavLink>
        <NavLink to="/messageBoard" className="link">留言板</NavLink> */}
      </div>
    )
  }
}


