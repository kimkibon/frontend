import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const ComQnaList = (props) => {
    const { QNA_DATE, QNA_ID, QNA_IDX, QNA_STATE, QNA_TITLE } = props.list;


    const handleRemove = (e) => { //버튼이 눌리면 실행이될
        e.preventDefault();
        if (window.confirm("정말 삭제합니까?")) {
            axios({ //통신으로 정보 받아오기
                method: 'post',
                url: '/GareBnB/mypage/deleteQna.do',
                contentType: "application/json;charset=UTF-8",
                params: {
                    QNA_IDX: QNA_IDX
                }

            }).then(Response => {
                window.location.href = "./qna";
                //응답이 들어왔을 때 SetForm 함수를 사용해서 
                //response의 data를 setForm의 정보로 변경
            });
            alert("삭제되었습니다.");
        } else {
            alert("취소합니다.");
        }
    };


    return (
        <div>
            <Table width="920px" height="50px" className="table table-hover">
                <tbody>
                    <tr onClick={() => { window.location.href = "./qna/DetailQna/" + QNA_IDX }}>
                        {/* onClick={handleDetail} */}
                        <td width="50px" valign='middle'>{QNA_IDX}</td>
                        <td width="70px" valign='middle'>{QNA_ID}</td>
                        <td className='title' width="200px" valign='middle'>
                            {QNA_TITLE}
                        </td>
                        <td width="100px" valign='middle'>{QNA_DATE}</td>
                        <td width="70px" valign='middle'>{QNA_STATE}</td>
                        <td width="70px" valign='middle'>
                            <Button onClick={handleRemove}> 삭제 </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

        </div>
    );
};

export default ComQnaList;