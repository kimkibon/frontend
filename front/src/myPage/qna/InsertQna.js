import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button,Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Auth from "../../login/Auth";


const InsertQna = ({}) => {

  //Auth
  const mem_id = localStorage.getItem("MEM_ID");//로컬스토리지에서 로그인한 계정의 아이디 전달
  const [author, setAuthor] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({ //book, setBook 랑 같은거
    title : '',
    content : '',
  }); //정보를 저장해서 보낼꺼니깐 useState 만들어주기 + 초기값 세팅
  


  const handleChange = (e) => { //이벤트 e 선언 폼의 text들이 change 될 때마다 e의 값이 넘어감
    const {name,value} = e.target
    setForm ({
      ...form, //...기존의 form 값에
    [name]:value
    //폼에서 값을 변경하면 e.target.value 값이 변경되면서 ((((((이렇게 선언하면 오류.,,,))))))
    //e.target.name(->이건 폼의 name 값 title을 말함)으로 들어감
    })
    //form 얘한테 title, content가 있음
  };



  const handleSubmit = (e) => { //버튼이 눌리면 실행이될
    e.preventDefault(); //submit이 action을 안타고 자기 할 일을 그만함.
    
      axios({ //통신으로 정보 받아오기
          method : 'post' ,
          url : '/GareBnB/mypage/memInsertQna.do' ,
              contentType:"application/json;charset=UTF-8",
              params : {
                  QNA_TITLE : (form.title),
                  MEM_ID : mem_id,
                  QNA_CONTENT : (form.content),
                  QNA_STATE : 0,
                  QNA_COMMENT : ''
              }
      }).then(Response => {
          setForm(Response.data);
          //응답이 들어왔을 때 SetForm 함수를 사용해서 
          //response의 data를 setForm의 정보로 변경
      });
      window.location.href ="./qna";
      setForm({ //입력하고 난 뒤 초기화
        title:'',
        content:'',
      })
  }


  return (
    <div>
      <h3>QNA 입력하기</h3>
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
      
      <br/>

    <div className='col-lg-12 text-lg-center'>
      <Button variant="primary" type="submit">
        입력하기
      </Button>
    </div>
    </Form>

    </div>
    </div>
  )
}

export default InsertQna