import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
            setDetail(Response.data);
            //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
            //response의 data를 detail의 정보로 변경
        });
      },[REPORT_IDX]);


      const state = detail.REPORT_STATE;
      const comment = detail.REPORT_COMMENT;
      const navigate = useNavigate(); //확인 누르면 뒤로가기  
        


  return (

    <>
      <div className='container mt-5 mb-5'>
          <div className="d-flex justify-content-center row">
            <div className='col-md-10 '>
              <div className='top'>
                  <h5>상세보기</h5>
                <hr/>

                <div className='title'>
                  <h2>{detail.REPORT_TITLE}</h2>
                </div>

                <div className='row'>
                  <div className='col-lg-10'>{detail.REPORT_ID}</div>
                  <div className='col-lg-2'>{detail.REPORT_DATE}</div>
                </div>
              </div>

              <hr/>
                <div className='col'>신고받는사람 : {detail.REPORT_MEM_IDX}</div>
                <hr/>
              <div className="con mt-3">
                <label className="content mt-2 pl-4" >
                {detail.REPORT_CONTENT}
                </label>
              </div>

              <hr/>

              <p>문의답변</p>
              <div className="com mt-1">
                <div className="comcom" >
                  {state === '미답변' ?
                  <p>답변이 등록되지 않았습니다.</p>:
                  comment
                  } 
                </div>
              </div>
              
              <br/>

            <div className='col-lg-12 text-lg-center'>
              <button type="button" className="btn btn-success"  
              onClick={(e)=>{ e.preventDefault(); navigate(-1); }}>확인</button>
            </div> 
          </div>
        </div>
      </div>  
    </>  

    //         제목 : {detail.REPORT_TITLE}<br/>
    //         내용 : {detail.REPORT_CONTENT}<br/>
    //         답변 : {detail.REPORT_COMMENT}<br/>
    //         날짜 : {detail.REPORT_DATE}<br/>
    //         상태 : {detail.REPORT_STATE}<br/>
    //         아이디 : {detail.REPORT_ID}<br/>
    //         번호 : {detail.REPORT_IDX}<br/>
    
            
      
  );
};

export default DetailReport;