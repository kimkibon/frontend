import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminBoardList from './adminComponent/AdminBoardList';

const AdminHostBoardList = () => {
  const [board, setBoard] = useState([]); //변수 초기화
  const [showBoard, setShowBoard] = useState([]);

  const searchConfirm = (e) => {
    let putArray = [];
    board.map(list => {
      if (list.BOARD_CONFIRM.toString() === e) {
        putArray.push(list)
      } else if (e === '6') {
        putArray.push(list)
      }
    })
    setShowBoard(putArray);
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: '/GareBnB/Admin/hostBoardList.do',
      params: {
        'BOARD_CARE_NO': '0',
        'BOARD_ADDR1': '',
      }
      //서버에서 리스트 요청
    }).then(Response => {
      setBoard(Response.data);
      setShowBoard(Response.data);
    })
  }, [])


  return (
    <div>
      <div className='container'>
        <hr />
        <h3>등록 글 리스트</h3>
        <hr />

        <div className='row'>
          <div className='btn-group mb-5 mt-5'>
            <button className='btn btn-primary' onClick={(e) => searchConfirm(e.target.value)} value='0'>
              등록 요청
            </button>
            <button className='btn btn-success' onClick={(e) => searchConfirm(e.target.value)} value='1'>
              등록 완료
            </button>
            <button className='btn btn-warning' onClick={(e) => searchConfirm(e.target.value)} value='2'>
              등록 거절
            </button>
            <button className='btn btn-info' onClick={(e) => searchConfirm(e.target.value)} value='3'>
              수정 요청
            </button>
            <button className='btn btn-danger' onClick={(e) => searchConfirm(e.target.value)} value='4'>
              삭제 완료
            </button>
            <button className='btn btn-secondary' onClick={(e) => searchConfirm(e.target.value)} value='5'>
              수정 취소
            </button>
            <button className='btn btn-light' onClick={(e) => searchConfirm(e.target.value)} value='6'>
              전체 글
            </button>
            {/* 어드민 계정에서 사용 가능한 버튼 모음 */}
          </div></div> </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          {showBoard[0] !== undefined &&
            showBoard.map((list, index) => {
              return (
                <div className='col' key={index}>
                  <AdminBoardList list={list} />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default AdminHostBoardList