import React from 'react'
import { Link } from 'react-router-dom'
const List = (board) => {

  return (

    <div className="container border border-primary">
      {board[0] !== undefined && board.map(list => {
        return (

          <div className="row">
            <div className="col-md-7">
              <img className="img-fluid rounded mb-3 mb-md-0" width='700px' height='300px' src={list.URL} alt="" />

            </div>
            <div className="col-md-5">
              <h3>{list.BOARD_TITLE}</h3>
              <p>{list.BOARD_CONTENT}</p>
              <h5 className='text-end'>{list.BOARD_PRICE}원/박</h5>
              <h5 className='text-end'>{list.BOARD_SCORE}</h5>
              <Link to='Detail' state={list}>
                <button className="btn btn-primary" href="#">자세한 정보 알아보기</button>
              </Link>
            </div>
          </div>

        )
      })}

{/* example */}
      <div className="row">
        <div className="col-md-7">
          <img className="img-fluid rounded mb-3 mb-md-0" src="https://via.placeholder.com/700x300" alt="" />

        </div>
        <div className="col-md-5">
          <h3>Project One</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
          <h5 className='text-end'>PRICE</h5>
          <h5 className='text-end'>SCORE</h5>
          <div className='col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0'>
          <button className="btn btn-primary" href="#">자세한 정보 알아보기</button>
          </div>
        </div>

      </div>
{/*  */}

    </div>

  )
}

export default List