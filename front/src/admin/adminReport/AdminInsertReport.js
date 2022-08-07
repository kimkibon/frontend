import React, { useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
 import {Button,Form} from 'react-bootstrap';
 import { useParams } from 'react-router-dom';


const AdminInsertReport = () => {

    const {REPORT_IDX} = useParams();

      //-------comment 업데이트
      const [reportUpdate , setReportUpdate] = useState({
        comment : '',
      });

      const handleChange = (e) => { //이벤트 e 선언 폼의 text들이 change 될 때마다 e의 값이 넘어감
        const {name,value} = e.target
        setReportUpdate ({
          ...reportUpdate, //...기존의 qnaUpdate 값에
        [name]:value
        })
        //console.log(form); //form 얘한테 comment가 담겨있음
      };
      
      //입력 버튼 클릭 시 update 실행해주는 함수 (레벨 미답변->답변완료
     
      const adminUpdateReport = (e) => { 
        e.preventDefault();
        axios({
        method : 'post',
        url : '/GareBnB/Admin/reportComment.do',
        contentType:"apllication/json; charset=UTF-8",
        params : {
          REPORT_COMMENT : (reportUpdate.comment),  //입력된 값이 넘어가야함
          REPORT_IDX : REPORT_IDX
        }
      }).then(Response => {
        console.log(Response.data);
        setReportUpdate(Response.data);
      });
      window.location.reload();
      }


     return (

        <div className='commentF'>
          <div> <h3>답변하기</h3>
        <Form onSubmit={adminUpdateReport}>
        <Form.Group controlId="formBasicEmail">
        <Form.Control type="text" placeholder="답변내용을 등록하세요" 
        onChange={handleChange} name="comment" value={reportUpdate.comment} />
      </Form.Group>

      <br/>
      <Button variant="primary" type="submit">
        입력하기
      </Button>
      </Form>
      </div>
      </div>  
  );
};

export default AdminInsertReport;