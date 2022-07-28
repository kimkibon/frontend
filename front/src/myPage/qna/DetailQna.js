import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import {useLocation} from 'react-router-dom';
//import QueryString from 'qs';
// import Table from 'react-bootstrap/Table';
// import Alert from 'react-bootstrap/Alert';


const DetailQna = () => {
    const {QNA_IDX} = useParams();

    const [detail, setDetail] = useState([]);
    useEffect(() => {
    axios({ //통신으로 정보 받아오기
            method : 'post' ,
            url : '/GareBnB/mypage/memDetailQna.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                QNA_IDX : QNA_IDX
            }
        }).then(Response => {
            console.log(Response.data);
            setDetail(Response.data);
            //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
            //response의 data를 detail의 정보로 변경
        });
      },[]);

        
        


  return (
    <div>
      <hr/>
      <h1>상세보기</h1>
      <hr/>

          <div>
            {/* 제목 : {QNA_TITLE}<br/>
            내용 : {QNA_CONTENT}<br/>
            답변 : {QNA_COMMENT}<br/>
            날짜 : {QNA_DATE}<br/>
            상태 : {QNA_STATE}<br/>
            아이디 : {QNA_ID}<br/>
            번호 : {QNA_IDX}<br/> */}

            제목 : {detail.QNA_TITLE}<br/>
            내용 : {detail.QNA_CONTENT}<br/>
            답변 : {detail.QNA_COMMENT}<br/>
            날짜 : {detail.QNA_DATE}<br/>
            상태 : {detail.QNA_STATE}<br/>
            아이디 : {detail.QNA_ID}<br/>
            번호 : {detail.QNA_IDX}<br/>
            
        
          </div>
          
    </div>          
  );
};

export default DetailQna;