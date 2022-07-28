import axios from "axios";
import React, { useEffect } from "react"
//인증관리
const Auth = (props) => {  //props에는 해당 페이지가 필요한 레벨을 표시
    useEffect(() => {
        console.log(props.LEVEL);
        // 페이지레벨이 멤버레벨보다 낮으면 빠꾸 높거나 같으면 통과
        const id = localStorage.getItem("MEM_ID"); //MEM_ID를 스토리지에서 얻어옴
        axios({
            method : 'post',
            url : "/GareBnB/Auth.do",
            params : {'MEM_ID' : id} //MEM_ID로 MEM_LEVEL을 얻어옴
        }).then(Response => {
        console.log(Response.data);
       if(Response.data.MEM_LEVEL > props.LEVEL ){ //페이지의 레벨이 멤버 레벨보다 낮으면 권한없음으로 뒤로가기
        console.log(localStorage.getItem("MEM_LEVEL"));
        alert("권한이 없습니다");
        window.history.back();
       } 
    })
        
       
    },[])
    
  }

  export default Auth;