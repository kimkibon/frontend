import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SelectOneFile from '../../commons/Files/SelectOneFile';
import AdminBoardList from './adminComponent/AdminBoardList';

const AdminHostBoardList = () => {
  const [board, setBoard] = useState([]); //변수 초기화
  const [showBoard , setShowBoard] = useState([]);

  const searchConfirm = (e) => {
    let putArray = [];
    board.map(list => {
      if(list.BOARD_CONFIRM.toString() === e){
        putArray.push(list)
      } else if(e === '6'){
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
      setBoard(Response.data)
      setShowBoard(Response.data)
      const url = Response.data.map(async list => {

        await SelectOneFile('0', list.BOARD_NO, list.BOARD_MODIFY_NO).then(Res => {
          //요청된 리스트의 게시글 넘버로 메인 이미지 요청

          list['URL'] = "data:image/;base64," + Res.URL
        })
          //변수에 URL 요소를 추가하고 서버로부터 리턴 받은 이미지를 문자화해서 저장
        return list
      })

      Promise.all(url).then((data) => { setBoard(data) });
      Promise.all(url).then((data) => { setShowBoard(data) });
      //async - await 로 받아온 객체는 promise 객체이므로 이를 변환해서 저장 
    })
  }, [])


  return (
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
      </div>
      {AdminBoardList(showBoard)}
    </div>
  )
}

export default AdminHostBoardList