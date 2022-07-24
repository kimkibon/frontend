import React from 'react'
import { Link } from 'react-router-dom'
const List = (board) => {

  return (

    <div className="container px-4 py-5" id="custom-cards">
  {board[0]!== undefined && board.map(list=>{return(
    <Link to='Detail' state={list}>
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        <div className="col">
          <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{backgroundImage: "url(" + list.URL + ")"}} >
            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{list.BOARD_TITLE}</h2>
              <ul className="d-flex list-unstyled mt-auto">
                <li className="me-auto">
                  <small>git</small>
                </li>
                <li className="d-flex align-items-center me-3">
                  <small>Earth</small>
                </li>
                <li className="d-flex align-items-center">
                  <small>3d</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Link>
    )})}
  </div>

  )
}

export default List