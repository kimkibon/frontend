import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
//import {useLocation} from 'react-router-dom';
//import QueryString from 'qs';
// import Table from 'react-bootstrap/Table';
// import Alert from 'react-bootstrap/Alert';
import './detail.css';


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


      const state = detail.QNA_STATE;
      const comment = detail.QNA_COMMENT;
      console.log(state); //미답변:0, 답변완료:1
      const navigate = useNavigate();
       
        


  return (
    <>
      <div className='container mt-5 mb-5'>
          <div className="d-flex justify-content-center row">
            <div className='col-md-10 '>
              <div className='top'>
                  <h5>상세보기</h5>
                <hr/>

                <div className='dtitle'>
                  <h2>{detail.QNA_TITLE}</h2>
                </div>

                <div className='row'>
                  <div className='col-lg-10'>{detail.QNA_ID}</div>
                  <div className='col-lg-2'>{detail.QNA_DATE}</div>
                </div>
              </div>

              <hr/>
              <div className="con mt-3">
                  {detail.QNA_CONTENT}
              </div>

              <hr/>

              <p>문의답변</p>
              <div className="com mt-1">
                <div className='comcom'>
                  {state === '미답변' ?
                  <p>답변이 등록되지 않았습니다.</p>:
                  comment
                  } 
                </div>
              </div>

              {/* 
                          상태 : {detail.QNA_STATE}<br/>
                          번호 : {detail.QNA_IDX}<br/> */}
              <br/>

              <div className='col-lg-12 text-lg-center'>
                <button type="button" className="btn btn-success"  
                onClick={(e)=>{ e.preventDefault(); navigate(-1); }}>확인</button>
              </div>
          </div>
        </div>
      </div>
    </>          
  );
};

export default DetailQna;