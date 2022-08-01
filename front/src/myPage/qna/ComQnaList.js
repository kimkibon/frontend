import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap';

const ComQnaList = (props) => {
    const {QNA_COMMENT, QNA_CONTENT, QNA_DATE, QNA_ID, QNA_IDX, QNA_STATE, QNA_TITLE} = props.list;
    

    const handleRemove = (e) => { //버튼이 눌리면 실행이될
          e.preventDefault();

            axios({ //통신으로 정보 받아오기
                method : 'post' ,
                url : '/GareBnB/mypage/deleteQna.do' ,
                contentType:"application/json;charset=UTF-8",
                params : {
                    QNA_IDX : QNA_IDX
                }
    
            }).then(Response => {
                console.log(Response.data);
                window.location.href ="./qna";
                //응답이 들어왔을 때 SetForm 함수를 사용해서 
                //response의 data를 setForm의 정보로 변경
            });
        };
    

    return(
            <div>               
                <Table width="920px" height="50px" className="table table-hover">
                    <tbody>
                        <tr>
                        {/* onClick={handleDetail} */}
                        <td width="50px">{QNA_IDX}</td>
                        <td width="70px">{QNA_ID}</td>
                        <td width="200px"> 
                            <Link to ={"./DetailQna/"+QNA_IDX} >
                                 {QNA_TITLE}
                                </Link>
                        </td>
                        <td width="100px">{QNA_DATE}</td>
                        <td width="70px">{QNA_STATE}</td>
                        <td width="70px">
                            <Button onClick={handleRemove}> 삭제 </Button>
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                    
            </div>
    );
};

export default ComQnaList;