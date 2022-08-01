import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import {useLocation} from 'react-router-dom';
//import QueryString from 'qs';
// import Table from 'react-bootstrap/Table';
// import Alert from 'react-bootstrap/Alert';


const DetailReport = () => {
    const {REPORT_IDX} = useParams();

    const [detail, setDetail] = useState([]);
    useEffect(() => {
    axios({ //통신으로 정보 받아오기
            method : 'post' ,
            url : '/GareBnB/mypage/memDetailReport.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                REPORT_IDX : REPORT_IDX
            }
        }).then(Response => {
            console.log(Response.data);
            setDetail(Response.data);
            //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
            //response의 data를 detail의 정보로 변경
        });
      },[REPORT_IDX]);

        
        


  return (
    <div>
      <hr/>
      <h1>상세보기</h1>
      <hr/>

          <div>

            제목 : {detail.REPORT_TITLE}<br/>
            내용 : {detail.REPORT_CONTENT}<br/>
            답변 : {detail.REPORT_COMMENT}<br/>
            날짜 : {detail.REPORT_DATE}<br/>
            상태 : {detail.REPORT_STATE}<br/>
            아이디 : {detail.REPORT_ID}<br/>
            번호 : {detail.REPORT_IDX}<br/>
            
        
          </div>
          
    </div>          
  );
};

export default DetailReport;