import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

//예약상태
const ResState = (state) => {
    switch (state) {
        case 0: return '예약요청'
        case 1: return '예약승인'
        case 2: return '결제대기'
        case 3: return '결제/예약완료'
        case 4: return '예약취소'
        case 5: return '이용완료'
    }
}



const AdminResInfo = () => {

    const { RES_IDX } = useParams();
    const [resInfo, setResInfo] = useState([]);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/GareBnB/Admin/resInfo.do',
            contentType: "application/json;charset=UTF-8",
            params: {
                RES_IDX: RES_IDX
            }
        }).then(Response => {
            setResInfo(Response.data);
        });
    }, []);

    return (
        <div>
            <h3>예약정보</h3>
            <table className="table">
                <tbody align='center'>
                    <tr>
                        <td>
                            예약번호
                        </td>
                        <td>
                            {resInfo.RES_IDX}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            예약상태
                        </td>
                        <td>
                            {ResState(resInfo.RES_LEVEL)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            예약자ID
                        </td>
                        <td>
                            {resInfo.RES_CLI_ID}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            호스트ID
                        </td>
                        <td>
                            {resInfo.RES_HOST_ID}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            게시글번호
                        </td>
                        <td>
                            {resInfo.RES_BOARD_NO}_{resInfo.RES_BOARD_MODIFY_NO}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            이용날짜
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            케어수
                        </td>
                        <td>
                            {resInfo.RES_CARE_NO}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            세부요청사항
                        </td>
                        <td>
                            {resInfo.RES_REQ_DETAIL}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            거절사유
                        </td>
                        <td>
                            {resInfo.RES_REJ}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            PG사
                        </td>
                        <td>
                            {resInfo.PG}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            결제수단
                        </td>
                        <td>
                            {resInfo.PAY_METHOD}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            결제금액
                        </td>
                        <td>
                            {resInfo.PAY_PRICE} 원
                        </td>
                    </tr>
                    <tr>
                        <td>
                            결제날짜
                        </td>
                        <td>
                            {resInfo.PAY_DATE}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='text-lg-center'>
                <Link to={'resCancel'} state={{ 'res_idx': resInfo.RES_IDX }}>
                    {[3, 5].includes(resInfo.RES_LEVEL) && <button type="button" className="btn btn-primary">환불하기</button>}
                    {[0, 1, 2].includes(resInfo.RES_LEVEL) && <button type="button" className="btn btn-primary">예약취소</button>}
                </Link>
                &nbsp;
                <button type="button" className="btn btn-primary"
                    onClick={(e) => { e.preventDefault(); window.location.href = "/admin/adminAllResList" }}>확인</button>
            </div>
        </div>


    )
}
export default AdminResInfo;