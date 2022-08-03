import React from 'react'
import { Link } from 'react-router-dom'
const List = (board) => {

  //상위 컴포넌트에서 받아온 데이터를 표시 

  return (
    <div className="container">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {board[0] !== undefined && board.map(list => {
          return (



            <div className="col">
              <div className="card shadow-sm">
                <svg
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height="225"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <img
                    className="d-block w-100"
                    src={list.URL}
                    alt=""
                  />
                </svg>

                <div className="card-body">
                  <h4 className="card-text">
                    {list.BOARD_TITLE}
                  </h4>
                  <figure class="text-end">
                    <p>
                      {list.BOARD_PRICE}원/일
                    </p>
                  </figure>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link to='Detail' state={list}>
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      </Link>
                    </div>
                    <small className="text-muted">{list.BOARD_SCORE}</small>
                  </div>
                </div>
              </div>
            </div>



          )
        })}

        {/* example */}

        {/*  */}
      </div>
    </div>

  )
}

export default List