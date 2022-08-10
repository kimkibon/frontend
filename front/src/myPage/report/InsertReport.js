import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const InsertReport = () => {

  const location = useLocation();
  const report_id = location.state.REPORT_ID; //
  const report_res_no = location.state.REPORT_RES_NO; //res_idx 받아옴
  const report_mem_idx = location.state.REPORT_MEM_IDX;



  const [form, setForm] = useState({
    title: '',
    content: '',
  }); //정보를 저장해서 보낼꺼니깐 useState 만들어주기 + 초기값 세팅



  const handleChange = (e) => { //이벤트 e 선언 폼의 text들이 change 될 때마다 e의 값이 넘어감
    const { name, value } = e.target
    setForm({
      ...form, //...기존의 form 값에
      [name]: value
      //폼에서 값을 변경하면 e.target.value 값이 변경되면서 ((((((이렇게 선언하면 오류.,,,))))))
      //e.target.name(->이건 폼의 name 값 title을 말함)으로 들어감
    })
    //form 얘한테 title, content가 있음
  };



  const handleSubmit = (e) => { //버튼이 눌리면 실행이될
    e.preventDefault(); //submit이 action을 안타고 자기 할 일을 그만함.

    axios({ //통신으로 정보 받아오기
      method: 'post',
      url: '/GareBnB/mypage/memReportInsert.do',
      contentType: "application/json;charset=UTF-8",
      params: {
        REPORT_TITLE: (form.title),
        REPORT_ID: report_id,
        REPORT_CONTENT: (form.content),
        REPORT_STATE: 0,
        REPORT_MEM_IDX: report_mem_idx,
        REPORT_RES_NO: report_res_no
      }
    }).then(Response => {
      setForm(Response.data);
      //응답이 들어왔을 때 SetForm 함수를 사용해서 
      //response의 data를 setForm의 정보로 변경
    });
    window.location.href = "/myPage/report";

  }


  return (
    <div>
      <h3> 신고하기 </h3>
      <div>
        {/* 위에 handleSubmit선언했음,, Form이 전송이 되면 실행 */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>TITLE</Form.Label>
            <Form.Control type="text" placeholder="제목을 입력하세요"
              onChange={handleChange} name="title" value={form.title} maxlength="16" />
            {/* onChange는 실행이 될때마다 뭔가가 바꾸니는것 */}
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>QNA Content</Form.Label>
            <Form.Control type="text" placeholder="문의내용을 입력하세요"
              onChange={handleChange} name="content" value={form.content} />
          </Form.Group>

          <Button variant="primary" type="submit">
            입력하기
          </Button>
        </Form>

      </div>
    </div>
  )
}

export default InsertReport;