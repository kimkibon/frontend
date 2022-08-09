import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css';
import AdminBoardList from '../../../admin/adminHostBoard/adminComponent/AdminBoardList';
import { Link } from 'react-router-dom';


const HostBoardList = () => {
  const [board, setBoard] = useState([]); //변수 초기화
  const memId = localStorage.getItem('MEM_ID');
  useEffect(() => {
    axios({
      method: 'get',
      url: '/GareBnB/host/mypage/myboardList.do',
      params: {
        'MEM_ID': memId
      }
      //서버에서 리스트 요청
    }).then(Response => {
      setBoard(Response.data)
    })
  }, [])



  return (
    <div className="container">
      <hr />
      <h3>내 게시글</h3>
      <hr />
      <div className='row d-inline-flex'>
        <div className='col float-end mt-5 mb-2'>
          <Link to={'/mypage/host/hostBoardForm'}>
            <button className='btn btn-primary'>게시글 작성</button>
          </Link>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {board[0] !== undefined && board.map(list => {
          {
            return (
              <div className='col' key={list.BOARD_NO}>
                <AdminBoardList list={list} />
              </div>
            )
          }
        })}
      </div>

    </div>
  )
}

export default HostBoardList