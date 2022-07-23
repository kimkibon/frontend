import React from 'react'
import { Link } from 'react-router-dom'
import '../component/List.css'
const List = (board) => {

  return (

  <div className="cards-row">
    {board.map(list=>{return(
    <div key={list.BOARD_NO} className="card">
      <img src={list.URL} className="card-image" alt='' />
      <div className="card-title">
      {list.BOARD_TITLE}
      </div>
      <div className="card-desc">
      {list.BOARD_CONTENT}
      </div>
      <div className="card-actions">
        <Link to='detail' state={list}>
          <button type='button' className='card-action-readMore'>
            상세보기
          </button>
        </Link>
      </div>
    </div>
    )})}
  </div>

  )
}

export default List