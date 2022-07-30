import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import InsertHostFiles from './InsertHostFiles';


const InsertHost = (props) => {

  //변수 초기 세팅
    console.log(props);
    axios({
      method : 'post' ,
      url : '/GareBnB/mypage/memChange.do' ,
      contentType:"application/json;charset=UTF-8",
      params : props

    }).then(Response => {
        window.location.href="/"
    });
  

}


export default InsertHost