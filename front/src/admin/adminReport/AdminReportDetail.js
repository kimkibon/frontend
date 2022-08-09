import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AdminInsertReport from './AdminInsertReport';


const AdminReportDetail = () => {

  const { REPORT_IDX } = useParams();

  const [detail, setDetail] = useState([]);
  useEffect(() => {
    axios({ //통신으로 정보 받아오기 --memDetailQna.do 랑 겹침,,
      method: 'post',
      url: '/GareBnB/Admin/reportDetail.do',
      contentType: "application/json;charset=UTF-8",
      params: {
        REPORT_IDX: REPORT_IDX
      }
    }).then(Response => {
      setDetail(Response.data);
      //응답이 들어왔을 때 SetQnaList 함수를 사용해서 
      //response의 data를 detail의 정보로 변경
    });
  }, []);


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
          navigate(-1);
      });
      alert("삭제되었습니다.");
        } else {
        alert("취소합니다.");
        }
  };



  const state = detail.REPORT_STATE;
  const navigate = useNavigate();


  return (

    <div className='container'>
      <div className='top'>
        <hr />

        <div className='hbutton text-lg-end'>
        <button type="button" className="btn btn-success"
                  onClick={handleRemove}>삭제</button>
        </div>

        <div className='dtitle'>
          <h2>{detail.REPORT_TITLE}</h2>
        </div>

        <div className='row'>
          <div className='col-lg-10'>{detail.REPORT_ID}</div>
          <div className='col-lg-2'>
            <div className='text-lg-end'>
              {detail.REPORT_DATE}
            </div>
          </div>
        </div>

        <hr/>
          <div className='col'>신고받는사람 : {detail.REPORT_MEM_IDX}</div>
        <hr/>
      </div>
      <div className="con mt-3">
        {detail.REPORT_CONTENT}
      </div>

      <hr />


      {/* 
                  상태 : {detail.REPORT_STATE}<br/>
                  번호 : {detail.REPORT_IDX}<br/> */}
      <br />
      <div>
        {state === 0 ? <AdminInsertReport /> :
          <>
            <label htmlFor="exampleTextarea" className="form-label mt-4"><h3>문의답변</h3></label>
            <div className="card border-success mb-3">
              <div className="card-body">
                <p className="card-text">{detail.REPORT_COMMENT}</p>
              </div>
            </div>
            <div className='col-lg-12 text-lg-center'>
              <button type="button" className="btn btn-success"
                onClick={(e) => { e.preventDefault(); navigate(-1); }}>확인</button>
            </div>
          </>
        }
      </div>
    </div>

  );
};

export default AdminReportDetail;