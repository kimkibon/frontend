import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SelectOneFile from '../../../commons/Files/SelectOneFile';
const AdminBoardList = (props) => {

    const list = props.list;

    const [url, setUrl] = useState();

    useEffect(() => {

        SelectOneFile('0', list.BOARD_NO, list.BOARD_MODIFY_NO).then(Res => {
            list['URL'] = "data:image/;base64," + Res.URL;
            setUrl("data:image/;base64," + Res.URL);
        });

    }, [])





    const state = (BOARD_CONFIRM) => {
        switch (BOARD_CONFIRM) {
            case 0:
                return ('등록 요청')

            case 1:
                return ('등록 완료')

            case 2:
                return ('등록 거절')

            case 3:
                return ('수정 요청')

            case 4:
                return ('삭제 완료')

            case 5:
                return ('수정 취소')

            default:
                return ('')
        }
    }
    //컴펌 레벨에 따른 종류 표시 
    return (

        <div className="card h-100 shadow-sm" >
            <Link to='/board/detail' state={list} >
                <img
                    className="d-block rounded p-1"
                    width='100%'
                    height='270px'
                    src={list.URL}
                    alt=""
                    style={{ 'objectFit': 'cover' }}
                />
            </Link>
            <div className="card-body">
                <h4 className="card-text">
                    {list.BOARD_TITLE}
                </h4>
                <figure className="text-end">
                    <p>
                        {state(list.BOARD_CONFIRM)}
                    </p>
                    <p>
                        {list.BOARD_HOST_ID}
                    </p>
                    <p>
                        {list.BOARD_ADDR1} {list.BOARD_ADDR2}
                    </p>
                </figure>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group col col-sm-2">
                        <Link to='/board/detail' state={list}>
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        </Link>
                    </div>
                    <small className="text-muted">{list.BOARD_SCORE}</small>
                </div>
            </div>
        </div>

    )
}

export default AdminBoardList