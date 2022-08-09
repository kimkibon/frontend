import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap';

const ComReportList = (props) => {
    const {REPORT_IDX, REPORT_ID, REPORT_TITLE, REPORT_DATE, REPORT_STATE} = props.list;
    const report_date = new Date(REPORT_DATE);
    
    const handleRemove = (e) => { //버튼이 눌리면 실행이될
        e.preventDefault();
        if (window.confirm("정말 삭제합니까?")) {
          axios({ //통신으로 정보 받아오기
              method : 'post' ,
              url : '/GareBnB/mypage/deleteReport.do' ,
              contentType:"application/json;charset=UTF-8",
              params : {
                  REPORT_IDX : REPORT_IDX
              }
  
          }).then(Response => {
              window.location.href ="./report";
              //응답이 들어왔을 때 SetForm 함수를 사용해서 
              //response의 data를 setForm의 정보로 변경
          });
          alert("삭제되었습니다.");
            } else {
            alert("취소합니다.");
            }
      };

    return(
            <div>               
                <Table width="920px" height="30px" className='table table-hover'>
                    <tbody>
                        <tr onClick={()=>{window.location.href="./report/DetailReport/"+REPORT_IDX}}>
                        <td width="50px" valign='middle'>{REPORT_IDX}</td>
                        <td width="70px" valign='middle'>{REPORT_ID}</td>
                        <td width="200px" valign='middle'>
                            {REPORT_TITLE}
                        </td>
                        <td width="100px" valign='middle'>{report_date.toISOString().slice(0,10).replace(/-/g,"/")}</td>
                        <td width="70px" valign='middle'>{REPORT_STATE}</td>
                        <td width="70px" valign='middle'>
                            <Button onClick={handleRemove}> 삭제 </Button>
                        </td> 
                        </tr>
                    </tbody>
                    </Table>

            </div>
    )
}

export default ComReportList;