import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';


const AdminInsertQna = () => {

  const { QNA_IDX } = useParams();


  //-------comment 업데이트
  const [qnaUpdate, setQnaUpdate] = useState({
    comment: ''
  });

  const handleChange = (e) => { //이벤트 e 선언 폼의 text들이 change 될 때마다 e의 값이 넘어감
    const { name, value } = e.target
    setQnaUpdate({
      ...qnaUpdate, //...기존의 qnaUpdate 값에
      [name]: value
    })
  };

  //입력 버튼 클릭 시 update 실행해주는 함수 (레벨 미답변->답변완료

  const adminUpdateQna = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/GareBnB/Admin/qnaComment.do',
      contentType: "apllication/json; charset=UTF-8",
      params: {
        QNA_COMMENT: (qnaUpdate.comment),  //입력된 값이 넘어가야함
        QNA_IDX: QNA_IDX
      }
    }).then(Response => {
      setQnaUpdate(Response.data);
    });
    window.location.reload();
  }

  const navigate = useNavigate();

  return (

    <div className='commentF'>
      <div> <h3>답변하기</h3>
        <Form onSubmit={adminUpdateQna}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="답변내용을 등록하세요"
              onChange={handleChange} name="comment" value={qnaUpdate.comment} />
          </Form.Group>

          <div className='qbutton text-lg-end'>
            <Button variant="primary" type="submit">
              입력하기
            </Button>
          </div>

          <div className='col-lg-12 text-lg-center'>
            <button type="button" className="btn btn-success"
              onClick={(e) => { e.preventDefault(); navigate(-1); }}>뒤로가기</button>
          </div>

        </Form>
      </div>
    </div>
  );
};

export default AdminInsertQna;