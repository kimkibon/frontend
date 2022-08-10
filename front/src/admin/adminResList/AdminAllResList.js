import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

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

const AdminAllResList = () => {
    const [resList, setResList] = useState([]);
    const [copyresList, setCopyresList] = useState([]);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/GareBnB/Admin/allresList.do',
            contentType: "application/json;charset=UTF-8",
        }).then(Response => {
            setResList(Response.data);
            setCopyresList(Response.data);
        });
    }, []);


    //selectbox
    const [selected, setSelected] = useState([]); //선택된 값
    const handleSelected = (e) => { //셀렉트박스 선택됐을때 ,, eventhandler
        //e.preventDefault(); //페이지가 자동 리프레시 되는 것을 막음
        setSelected(e.target.value); //e.target.value 값이 setSelected,, search에 들어감
    };

    const SelectBox = () => {

        if (selected === '6') {
            setCopyresList(resList);
        } else if (selected === '0') {
            const listData = resList.filter(list => list.RES_LEVEL === 0 && true);
            setCopyresList(listData);

        } else if (selected === '1') {
            const listData = resList.filter(list => list.RES_LEVEL === 1 && true);
            setCopyresList(listData);
        } else if (selected === '2') {
            const listData = resList.filter(list => list.RES_LEVEL === 2 && true);
            setCopyresList(listData);
        } else if (selected === '3') {
            const listData = resList.filter(list => list.RES_LEVEL === 3 && true);
            setCopyresList(listData);
        } else if (selected === '4') {
            const listData = resList.filter(list => list.RES_LEVEL === 4 && true);
            setCopyresList(listData);
        } else if (selected === '5') {
            const listData = resList.filter(list => list.RES_LEVEL === 5 && true);
            setCopyresList(listData);
        }
        setSelected('');
    };

    return (
        <div className='container'>
            <hr />
            <h3>예약 리스트</h3>
            <hr />
            <Table striped width="900px" height="30px" className="table table-hover">
                <thead>
                    <tr align='center'>
                        <td width="10%">예약번호</td>
                        <td width="20%">예약자ID</td>
                        <td width="20%">호스트ID</td>
                        <td width="30%">게시글번호</td>
                        <td width="20%">
                            <div className="form-group" onChange={handleSelected}>
                                <select className="form-select">
                                    <option key={6} value="6">예약상태</option>
                                    <option key={0} value="0">예약요청</option>
                                    <option key={1} value="1">예약승인</option>
                                    <option key={2} value="2">결제대기</option>
                                    <option key={3} value="3">결제/예약완료</option>
                                    <option key={4} value="4">예약취소</option>
                                    <option key={5} value="5">이용완료</option>

                                </select>
                                <SelectBox />
                            </div>
                        </td>


                    </tr>
                </thead>



                {copyresList[0] !== undefined && copyresList.map((list) => {
                    return (
                        <tbody>
                            <tr align='center' onClick={() => { window.location.href = "./adminAllResList/adminResInfo/" + list.RES_IDX }}>
                                <td>{list.RES_IDX}</td>
                                <td>{list.RES_CLI_ID}</td>
                                <td>{list.RES_HOST_ID}</td>
                                <td>{list.RES_BOARD_NO}_{list.RES_BOARD_MODIFY_NO}</td>
                                <td>{ResState(list.RES_LEVEL)}</td>
                            </tr>
                        </tbody>
                    )
                })}

            </Table>

        </div>

    )
}
export default AdminAllResList;