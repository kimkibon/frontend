import React from 'react'
import 'bootstrap/js/dist/collapse'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="flex-shrink-0 p-3 bg-white" style={{ width: 280 + "px" }}>
      <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
        <span className="fs-5 fw-semibold">Collapsible</span>
      </a>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded collapsed" 
          data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
            mypage
          </button>
          <div className="collapse" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <Link to='host'><li>Host</li></Link>
              <Link to=''><li>MyPage</li></Link>
              <Link to='member'><li>member</li></Link>
              <Link to='report'><li>report</li></Link>
              <Link to='qna'><li>qna</li></Link>
              <Link to='reserveList'><li>reserveList</li></Link>
              <Link to='reviewList'><li>reviewList</li></Link>
            </ul>
          </div>
        </li>

      </ul>
    </div>)
}

export default Sidebar