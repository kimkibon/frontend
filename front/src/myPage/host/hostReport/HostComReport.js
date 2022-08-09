import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const HostComReport = (props) => {
    const { REPORT_IDX, REPORT_TITLE, REPORT_CONTENT, REPORT_DATE, REPORT_STATE } = props.list;

    const handleRemove = (e) => { //버튼이 눌리면 실행이될
        e.preventDefault();

        axios({ //통신으로 정보 받아오기
            method: 'post',
            url: '/GareBnB/host/mypage/deleteReport.do',
            contentType: "application/json;charset=UTF-8",
            params: {
                REPORT_IDX: REPORT_IDX
            }

        }).then(Response => {
            window.location.href = "./host/hostReport";
            //응답이 들어왔을 때 SetForm 함수를 사용해서 
            //response의 data를 setForm의 정보로 변경
        });
    };

    return (
        <div>
            <Table width="900px" height="30px" className='table table-hover'>
                <tbody>
                    <tr>
                        <td width="50px">{REPORT_IDX}</td>
                        <td width="70px">{REPORT_STATE}</td>
                        <td width="200px">
                            <Link to={"./HostDetailReport/" + REPORT_IDX} >
                                {REPORT_TITLE}
                            </Link>
                        </td>
                        <td width="200px">{REPORT_CONTENT}</td>
                        <td width="100px">{REPORT_DATE}</td>
                        <td width="70px">
                            <Button onClick={handleRemove}> 삭제 </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

        </div>
    )
}

export default HostComReport;