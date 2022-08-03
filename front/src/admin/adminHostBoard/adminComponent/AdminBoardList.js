import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import SelectOneFile from '../../../commons/Files/SelectOneFile'
const AdminBoardList = (board) => {

    //상위 컴포넌트에서 받아온 데이터를 표시 

    const state = (BOARD_CONFIRM) => {
        switch (BOARD_CONFIRM) {
            case 0:
                return ('등록 요청')
                break;

            case 1:
                return ('등록 완료')
                break;

            case 2:
                return ('등록 거절')
                break;

            case 3:
                return ('수정 요청')
                break;

            case 4:
                return ('삭제 완료')
                break;

            case 5:
                return ('수정 취소')
                break;
        }
    }

    function imageUrl(props){
        SelectOneFile(props).then(Res => {
            return ("data:image/;base64,"+Res)
        })
    }

    return (

        <div className="container border border-primary">
            {board[0] !== undefined && board.map((list, index) => {
                return (

                    <div className="row border border-primary" key={index}>
                        <div className="col-md-7">
                            <img className="d-block w-100"
                                width='700px'
                                height='400px'

                                src={imageUrl(list.BOARD_NO)}
                                alt=""
                            />
                        </div>
                        <div className="col-md-4">
                            <h3>게시글 제목 </h3>
                            <h3>{list.BOARD_TITLE}</h3>
                            <p>게시글 수정 상태 {list.BOARD_MODIFY_NO}번째</p>
                            <h5 className='text-end'>게시글 등록 상태 </h5>
                            <h5 className='text-end'>{state(list.BOARD_CONFIRM)}</h5>
                            <h5 className='text-end'>게시글 등록 회원 아이디 </h5>
                            <h5 className='text-end'>{list.BOARD_HOST_ID}</h5>
                            <Link to='/board/Detail' state={list}>
                                <button className="btn btn-primary" href="#">자세한 정보 알아보기</button>
                            </Link>
                        </div>
                    </div>

                )
            })}

            {/* example */}
            <div className="row">
                <div className="col-md-7">
                    <img className="d-block w-100" src="https://via.placeholder.com/700x300" alt="" />

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

        </div>

    )
}

export default AdminBoardList